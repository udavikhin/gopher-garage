package middleware

import (
	"log"
	"net/http"
	"time"
)

type writerWithStatusCode struct {
	http.ResponseWriter
	statusCode int
}

func (w *writerWithStatusCode) WriteHeader(statusCode int) {
	w.ResponseWriter.WriteHeader(statusCode)
	w.statusCode = statusCode
}

func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		wrappedWriter := &writerWithStatusCode{
			ResponseWriter: w,
			statusCode:     http.StatusOK,
		}

		next.ServeHTTP(wrappedWriter, r)
		log.Println(wrappedWriter.statusCode, r.Method, r.URL.Path, time.Since(start))
	})
}
