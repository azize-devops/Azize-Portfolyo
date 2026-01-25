package models

import (
	"time"

	"gorm.io/gorm"
)

type ContactMessage struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	Name      string         `gorm:"not null;size:100" json:"name"`
	Email     string         `gorm:"not null;size:255" json:"email"`
	Subject   string         `gorm:"size:200" json:"subject"`
	Message   string         `gorm:"not null;type:text" json:"message"`
	IPAddress string         `gorm:"size:45" json:"-"` // Don't expose IP in JSON
	UserAgent string         `gorm:"size:500" json:"-"`
	Read      bool           `gorm:"default:false" json:"read"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type CreateContactRequest struct {
	Name    string `json:"name" binding:"required,min=2,max=100"`
	Email   string `json:"email" binding:"required,email,max=255"`
	Subject string `json:"subject" binding:"max=200"`
	Message string `json:"message" binding:"required,min=10,max=5000"`
}

type ContactResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
