package repository

import (
	"context"
	"fmt"
	"strings"
)

type filter struct {
	conditions []string
	args       []any
}

func (f *filter) add(condition string, arg any) {
	f.conditions = append(f.conditions, fmt.Sprintf(condition, len(f.args)+1))
	f.args = append(f.args, arg)
}

func (f *filter) build() string {
	if len(f.conditions) == 0 {
		return ""
	}
	return " AND " + strings.Join(f.conditions, " AND ")
}

type SearchOfferParams struct {
	Make     string
	Model    string
	PriceMin int
	PriceMax int
	YearMin  int
	YearMax  int
	Gearbox  string
	Page     int
	PerPage  int
}

func (q *Queries) SearchOffers(ctx context.Context, params SearchOfferParams) ([]GetAllOffersRow, int, error) {
	f := constructSearchOfferParamsFilter(params)
	query := getFilteredOffersQuery(f)
	limit := params.PerPage
	offset := (params.Page - 1) * limit
	queryArgs := append(f.args, limit, offset)
	count, err := q.CountFilteredOffers(ctx, f)
	if err != nil {
		return nil, 0, err
	}
	rows, err := q.db.Query(ctx, query, queryArgs...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()
	var items []GetAllOffersRow
	for rows.Next() {
		var i GetAllOffersRow
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.Make,
			&i.Model,
			&i.Year,
			&i.Gearbox,
			&i.Mileage,
			&i.Color,
			&i.Fuel,
			&i.Price,
			&i.Owners,
			&i.Negotiable,
			&i.Description,
			&i.ArchivedAt,
			&i.CreatedAt,
			&i.PhotoID,
			&i.PhotoFilename,
		); err != nil {
			return nil, count, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, count, err
	}
	return items, count, nil
}

func constructSearchOfferParamsFilter(params SearchOfferParams) *filter {
	f := &filter{}

	if params.Make != "" {
		f.add("o.make = $%d", params.Make)
	}
	if params.Model != "" {
		f.add("o.model = $%d", params.Model)
	}
	if params.PriceMin > 0 {
		f.add("o.price >= $%d", params.PriceMin)
	}
	if params.PriceMax > 0 {
		f.add("o.price <= $%d", params.PriceMax)
	}
	if params.YearMin > 0 {
		f.add("o.year >= $%d", params.YearMin)
	}
	if params.YearMax > 0 {
		f.add("o.year <= $%d", params.YearMax)
	}
	if params.Gearbox != "" {
		f.add("o.gearbox = $%d", params.Gearbox)
	}

	return f
}

func (q *Queries) CountFilteredOffers(ctx context.Context, f *filter) (int, error) {
	var total int
	err := q.db.QueryRow(ctx, "SELECT COUNT(*) FROM offers o WHERE o.archived_at IS NULL"+f.build(), f.args...).Scan(&total)
	if err != nil {
		return 0, err
	}

	return total, nil
}

func getFilteredOffersQuery(f *filter) string {
	return getAllOffers + f.build() + fmt.Sprintf(" ORDER BY o.created_at DESC LIMIT $%d OFFSET $%d", len(f.args)+1, len(f.args)+2)
}
