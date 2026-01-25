package models

import (
	"time"

	"gorm.io/gorm"
)

type Certification struct {
	ID              uint           `gorm:"primarykey" json:"id"`
	Name            string         `gorm:"not null;size:200" json:"name"`
	Issuer          string         `gorm:"not null;size:200" json:"issuer"`
	Description     string         `gorm:"type:text" json:"description"`
	CredentialID    string         `gorm:"size:100" json:"credential_id"`
	CredentialURL   string         `gorm:"size:500" json:"credential_url"`
	BadgeURL        string         `gorm:"size:500" json:"badge_url"`
	IssuedDate      time.Time      `json:"issued_date"`
	ExpirationDate  *time.Time     `json:"expiration_date"`
	Featured        bool           `gorm:"default:false" json:"featured"`
	Order           int            `gorm:"default:0" json:"order"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
	DeletedAt       gorm.DeletedAt `gorm:"index" json:"-"`
}

type CreateCertificationRequest struct {
	Name           string     `json:"name" binding:"required,max=200"`
	Issuer         string     `json:"issuer" binding:"required,max=200"`
	Description    string     `json:"description"`
	CredentialID   string     `json:"credential_id" binding:"max=100"`
	CredentialURL  string     `json:"credential_url" binding:"omitempty,url"`
	BadgeURL       string     `json:"badge_url" binding:"omitempty,url"`
	IssuedDate     time.Time  `json:"issued_date" binding:"required"`
	ExpirationDate *time.Time `json:"expiration_date"`
	Featured       bool       `json:"featured"`
	Order          int        `json:"order"`
}

type UpdateCertificationRequest struct {
	Name           *string    `json:"name" binding:"omitempty,max=200"`
	Issuer         *string    `json:"issuer" binding:"omitempty,max=200"`
	Description    *string    `json:"description"`
	CredentialID   *string    `json:"credential_id" binding:"omitempty,max=100"`
	CredentialURL  *string    `json:"credential_url" binding:"omitempty,url"`
	BadgeURL       *string    `json:"badge_url" binding:"omitempty,url"`
	IssuedDate     *time.Time `json:"issued_date"`
	ExpirationDate *time.Time `json:"expiration_date"`
	Featured       *bool      `json:"featured"`
	Order          *int       `json:"order"`
}
