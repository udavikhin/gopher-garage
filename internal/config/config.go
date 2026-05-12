package config

import (
	"fmt"
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
	fmt.Println(key, value)
	if !ok {
		return fallback
	}

	return value
}
