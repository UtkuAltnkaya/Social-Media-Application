package main

import (
	"fmt"

	"github.com/UtkuAltnkaya/Social-Media-App/services/follow/src"
	"github.com/UtkuAltnkaya/Social-Media-App/services/follow/src/config"
)

func main() {
	config.LoadEnv()
	db := config.ConnectDatabase()
	channel := config.ConnectRabbitMQ()
	defer channel.Close()

	fmt.Println("Follow Service is running")
	consumer := src.NewConsumer(db, channel)
	consumer.Consume()
}
