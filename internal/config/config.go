package config

import (
	"os"
)

type Config struct {
	Server   *ServerConfig
	Database *DatabaseConfig
	Auth     *AuthConfig
	CORS     *CORSConfig
}

func NewConfig() *Config {
	return &Config{
		Server:   NewServerConfig(),
		Database: NewDatabaseConfig(),
		Auth:     NewAuthConfig(),
		CORS:     NewCORSConfig(),
	}
}

func getEnv(key string, fallback string) string {
	value, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}

	return value
}
