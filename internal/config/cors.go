package config

type CORSConfig struct {
	AllowedOrigins []string
	AllowedMethods []string
	AllowedHeaders []string
}

func NewCORSConfig() *CORSConfig {
	return &CORSConfig{
		AllowedOrigins: []string{"http://localhost:5174"},
		AllowedMethods: []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
		AllowedHeaders: []string{"Accept", "Content-Type"},
	}
}
