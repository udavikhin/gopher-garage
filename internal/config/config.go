package config

import (
	"os"
)

type Config struct {
	Server   *ServerConfig
	Database *DatabaseConfig
}

func NewConfig() *Config {
	return &Config{
		Server:   NewServerConfig(),
		Database: NewDatabaseConfig(),
	}
}

func getEnv(key string, fallback string) string {
	value, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}

	return value
}
