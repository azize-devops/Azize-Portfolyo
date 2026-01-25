package handlers

import (
	"net/http"
	"strconv"

	"github.com/azize/devops-journey-backend/internal/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ContactHandler struct {
	db *gorm.DB
}

func NewContactHandler(db *gorm.DB) *ContactHandler {
	return &ContactHandler{db: db}
}

// SubmitContact handles contact form submissions (public, rate limited)
func (h *ContactHandler) SubmitContact(c *gin.Context) {
	var req models.CreateContactRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Basic XSS prevention - Gin's binding already does some sanitization
	// For production, consider using a dedicated sanitization library

	message := models.ContactMessage{
		Name:      req.Name,
		Email:     req.Email,
		Subject:   req.Subject,
		Message:   req.Message,
		IPAddress: c.ClientIP(),
		UserAgent: c.Request.UserAgent(),
	}

	if err := h.db.Create(&message).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to submit message"})
		return
	}

	// TODO: Send email notification to admin (implement SMTP service)

	c.JSON(http.StatusCreated, models.ContactResponse{
		Success: true,
		Message: "Your message has been sent successfully!",
	})
}

// GetMessages returns all contact messages (admin only)
func (h *ContactHandler) GetMessages(c *gin.Context) {
	var messages []models.ContactMessage

	query := h.db.Order("created_at DESC")

	// Filter by read status if query param exists
	if readStatus := c.Query("read"); readStatus != "" {
		isRead := readStatus == "true"
		query = query.Where("read = ?", isRead)
	}

	// Pagination
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 20
	}
	offset := (page - 1) * limit

	var total int64
	h.db.Model(&models.ContactMessage{}).Count(&total)

	if err := query.Offset(offset).Limit(limit).Find(&messages).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch messages"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"messages": messages,
		"pagination": gin.H{
			"page":       page,
			"limit":      limit,
			"total":      total,
			"total_pages": (total + int64(limit) - 1) / int64(limit),
		},
	})
}

// GetMessage returns a single message by ID (admin only)
func (h *ContactHandler) GetMessage(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid message ID"})
		return
	}

	var message models.ContactMessage
	if err := h.db.First(&message, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Message not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch message"})
		return
	}

	// Mark as read
	if !message.Read {
		h.db.Model(&message).Update("read", true)
		message.Read = true
	}

	c.JSON(http.StatusOK, message)
}

// MarkAsRead marks a message as read (admin only)
func (h *ContactHandler) MarkAsRead(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid message ID"})
		return
	}

	result := h.db.Model(&models.ContactMessage{}).Where("id = ?", id).Update("read", true)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update message"})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Message not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Message marked as read"})
}

// DeleteMessage deletes a message (admin only)
func (h *ContactHandler) DeleteMessage(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid message ID"})
		return
	}

	result := h.db.Delete(&models.ContactMessage{}, id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete message"})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Message not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Message deleted successfully"})
}

// GetUnreadCount returns the count of unread messages (admin only)
func (h *ContactHandler) GetUnreadCount(c *gin.Context) {
	var count int64
	if err := h.db.Model(&models.ContactMessage{}).Where("read = ?", false).Count(&count).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to count messages"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"unread_count": count})
}
