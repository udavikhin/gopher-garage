package auth

type RegisterUserRequest struct {
	Email       string `json:"email,omitempty" validate:"required,email"`
	FullName    string `json:"full_name,omitempty" validate:"required"`
	Password    string `json:"password,omitempty" validate:"required"`
	PhoneNumber string `json:"phone_number,omitempty" validate:"required"`
}

type LoginUserRequest struct {
	Email    string `json:"email,omitempty" validate:"required,email"`
	Password string `json:"password,omitempty" validate:"required"`
}
