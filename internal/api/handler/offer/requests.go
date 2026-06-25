package offer

type CreateOfferRequest struct {
	Make        string `json:"make"        validate:"required"`
	Model       string `json:"model"       validate:"required"`
	Year        int    `json:"year"        validate:"required,min=1900,max=2026"`
	Gearbox     string `json:"gearbox"     validate:"required,oneof=auto manual"`
	Mileage     int    `json:"mileage"     validate:"required,min=0,max=999999"`
	Color       string `json:"color"       validate:"required"`
	Fuel        string `json:"fuel"        validate:"required,oneof=petrol diesel"`
	Owners      int    `json:"owners"      validate:"required,min=1,max=100"`
	Price       int    `json:"price"       validate:"required,min=0,max=1000000000"`
	Negotiable  bool   `json:"negotiable"  validate:"required"`
	Description string `json:"description" validate:"required"`
}
