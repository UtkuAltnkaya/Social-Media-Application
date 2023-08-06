package config

import (
	"log"
	"os"

	"github.com/streadway/amqp"
)

const exchangeName = "follow_exchange"

var QueueKey = map[string]struct {
	QueueName  string
	RoutingKey string
}{
	"user_follow": {
		QueueName:  "follow_user_follow",
		RoutingKey: "follow.user_follow",
	},
	"user_unfollow": {
		QueueName:  "follow_user_unfollow",
		RoutingKey: "follow.user_unfollow",
	},
	"user_all_followers": {
		QueueName:  "follow_user_all_followers",
		RoutingKey: "follow.user_all_followers",
	},
	"user_is_follows": {
		QueueName:  "follow_user_is_follows",
		RoutingKey: "follow.user_is_follows",
	},
}

func ConnectRabbitMQ() *amqp.Channel {
	conn, err := amqp.Dial(os.Getenv("RABBITMQ"))
	if err != nil {
		panic(err)
	}
	channel, err := conn.Channel()
	if err != nil {
		panic(err)
	}

	declareExchange(channel, exchangeName)

	for _, value := range QueueKey {
		declareQueue(channel, value.QueueName)
		declareQueue(channel, value.QueueName)
		bindQueueToExchange(channel, value.QueueName, exchangeName, value.RoutingKey)
	}

	log.Println("Connected to RabbitMQ")

	return channel
}

func declareExchange(channel *amqp.Channel, exchangeName string) {
	err := channel.ExchangeDeclare(
		exchangeName,
		"direct",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		panic(err)
	}
}

func declareQueue(channel *amqp.Channel, queueName string) *amqp.Queue {
	queue, err := channel.QueueDeclare(
		queueName,
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		panic(err)
	}
	return &queue
}

func bindQueueToExchange(channel *amqp.Channel, queueName, exchangeName, routingKey string) {
	err := channel.QueueBind(
		queueName,
		routingKey,
		exchangeName,
		false,
		nil,
	)
	if err != nil {
		panic(err)
	}
}
