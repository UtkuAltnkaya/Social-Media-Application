FROM golang:1.20

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN mv .env.docker .env

RUN go build -o followService
CMD ["./followService"]
