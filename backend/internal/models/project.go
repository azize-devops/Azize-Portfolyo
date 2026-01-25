package models

import (
	"time"

	"gorm.io/gorm"
)

type Project struct {
	ID          uint           `gorm:"primarykey" json:"id"`
	Title       string         `gorm:"not null;size:200" json:"title"`
	Description string         `gorm:"type:text" json:"description"`
	ImageURL    string         `gorm:"size:500" json:"image_url"`
	GitHubURL   string         `gorm:"size:500" json:"github_url"`
	DemoURL     string         `gorm:"size:500" json:"demo_url"`
	Technologies []string      `gorm:"type:text[];serializer:json" json:"technologies"`
	Featured    bool           `gorm:"default:false" json:"featured"`
	Order       int            `gorm:"default:0" json:"order"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

type CreateProjectRequest struct {
	Title        string   `json:"title" binding:"required,max=200"`
	Description  string   `json:"description"`
	ImageURL     string   `json:"image_url" binding:"omitempty,url"`
	GitHubURL    string   `json:"github_url" binding:"omitempty,url"`
	DemoURL      string   `json:"demo_url" binding:"omitempty,url"`
	Technologies []string `json:"technologies"`
	Featured     bool     `json:"featured"`
	Order        int      `json:"order"`
}

type UpdateProjectRequest struct {
	Title        *string  `json:"title" binding:"omitempty,max=200"`
	Description  *string  `json:"description"`
	ImageURL     *string  `json:"image_url" binding:"omitempty,url"`
	GitHubURL    *string  `json:"github_url" binding:"omitempty,url"`
	DemoURL      *string  `json:"demo_url" binding:"omitempty,url"`
	Technologies []string `json:"technologies"`
	Featured     *bool    `json:"featured"`
	Order        *int     `json:"order"`
}
