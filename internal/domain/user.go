package domain

type UserRegisterRequest struct {
	Email      string `json:"email,omitempty"`
	FirstName  string `json:"first_name,omitempty"`
	LastName   string `json:"last_name,omitempty"`
	Patronymic string `json:"patronymic,omitempty"`
	Password   string `json:"password,omitempty"`
}
