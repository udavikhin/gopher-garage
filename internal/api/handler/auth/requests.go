package auth

type AddUserRequest struct {
	Email      string `json:"email,omitempty" validate:"required,email"`
	FirstName  string `json:"first_name,omitempty" validate:"required"`
	LastName   string `json:"last_name,omitempty" validate:"required"`
	Patronymic string `json:"patronymic,omitempty"`
	Password   string `json:"password,omitempty" validate:"required"`
}
