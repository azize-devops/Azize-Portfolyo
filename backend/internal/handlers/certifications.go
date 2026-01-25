package handlers

import (
	"net/http"
	"strconv"

	"github.com/azize/devops-journey-backend/internal/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CertificationHandler struct {
	db *gorm.DB
}

func NewCertificationHandler(db *gorm.DB) *CertificationHandler {
	return &CertificationHandler{db: db}
}

// GetCertifications returns all certifications (public)
func (h *CertificationHandler) GetCertifications(c *gin.Context) {
	var certifications []models.Certification

	query := h.db.Order("\"order\" ASC, issued_date DESC")

	// Filter by featured if query param exists
	if featured := c.Query("featured"); featured == "true" {
		query = query.Where("featured = ?", true)
	}

	if err := query.Find(&certifications).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch certifications"})
		return
	}

	c.JSON(http.StatusOK, certifications)
}

// GetCertification returns a single certification by ID
func (h *CertificationHandler) GetCertification(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid certification ID"})
		return
	}

	var certification models.Certification
	if err := h.db.First(&certification, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Certification not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch certification"})
		return
	}

	c.JSON(http.StatusOK, certification)
}

// CreateCertification creates a new certification (admin only)
func (h *CertificationHandler) CreateCertification(c *gin.Context) {
	var req models.CreateCertificationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	certification := models.Certification{
		Name:           req.Name,
		Issuer:         req.Issuer,
		Description:    req.Description,
		CredentialID:   req.CredentialID,
		CredentialURL:  req.CredentialURL,
		BadgeURL:       req.BadgeURL,
		IssuedDate:     req.IssuedDate,
		ExpirationDate: req.ExpirationDate,
		Featured:       req.Featured,
		Order:          req.Order,
	}

	if err := h.db.Create(&certification).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create certification"})
		return
	}

	c.JSON(http.StatusCreated, certification)
}

// UpdateCertification updates an existing certification (admin only)
func (h *CertificationHandler) UpdateCertification(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid certification ID"})
		return
	}

	var certification models.Certification
	if err := h.db.First(&certification, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Certification not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch certification"})
		return
	}

	var req models.UpdateCertificationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update only provided fields
	updates := make(map[string]interface{})
	if req.Name != nil {
		updates["name"] = *req.Name
	}
	if req.Issuer != nil {
		updates["issuer"] = *req.Issuer
	}
	if req.Description != nil {
		updates["description"] = *req.Description
	}
	if req.CredentialID != nil {
		updates["credential_id"] = *req.CredentialID
	}
	if req.CredentialURL != nil {
		updates["credential_url"] = *req.CredentialURL
	}
	if req.BadgeURL != nil {
		updates["badge_url"] = *req.BadgeURL
	}
	if req.IssuedDate != nil {
		updates["issued_date"] = *req.IssuedDate
	}
	if req.ExpirationDate != nil {
		updates["expiration_date"] = req.ExpirationDate
	}
	if req.Featured != nil {
		updates["featured"] = *req.Featured
	}
	if req.Order != nil {
		updates["order"] = *req.Order
	}

	if err := h.db.Model(&certification).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update certification"})
		return
	}

	// Reload to return updated data
	h.db.First(&certification, id)
	c.JSON(http.StatusOK, certification)
}

// DeleteCertification deletes a certification (admin only)
func (h *CertificationHandler) DeleteCertification(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid certification ID"})
		return
	}

	result := h.db.Delete(&models.Certification{}, id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete certification"})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Certification not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Certification deleted successfully"})
}
