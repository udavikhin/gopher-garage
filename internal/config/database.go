package config

type DatabaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Database string
}

func NewDatabaseConfig() *DatabaseConfig {
	return &DatabaseConfig{
		Host:     getEnv("POSTGRES_HOST", ""),
		Port:     getEnv("POSTGRES_PORT", ""),
		User:     getEnv("POSTGRES_USER", ""),
		Password: getEnv("POSTGRES_PASSWORD", ""),
		Database: getEnv("POSTGRES_DB", ""),
	}
}
