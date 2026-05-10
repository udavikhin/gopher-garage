package config

type ServerConfig struct {
	Port string
}

func NewServerConfig() *ServerConfig {
	return &ServerConfig{
		Port: getEnv("SERVER_PORT", "8080"),
	}
}
