package main

type Smartphone struct {
	ID          int     `json:"id"`
	Model       string  `json:"model"`
	Producer    string  `json:"producer"`
	Color       string  `json:"color"`
	ScreenSize  float64 `json:"screenSize"`
	Description string  `json:"description"`
	Image       string  `json:"image"`
	Price       int     `json:"price"`
}
