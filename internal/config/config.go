package config

import (
	"os"
)

type Config struct {
	Server *ServerConfig
}

func NewConfig() *Config {
	return &Config{
		Server: NewServerConfig(),
	}
}

func getEnv(key string, fallback string) string {
	value, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}

	return value
}
