package src

import (
	"encoding/json"
	"log"

	"github.com/UtkuAltnkaya/Social-Media-App/services/follow/src/config"
	"github.com/UtkuAltnkaya/Social-Media-App/services/follow/src/model"
	"github.com/streadway/amqp"
	"gorm.io/gorm"
)

type Consumer struct {
	followService FollowService
	channel       *amqp.Channel
}

type followData struct {
	UserId   string `json:"user_id"`
	FollowId string `json:"follow_id"`
}

func NewConsumer(db *gorm.DB, channel *amqp.Channel) Consumer {
	return Consumer{
		followService: NewFollowService(db),
		channel:       channel,
	}
}

func (c *Consumer) consumeMessages(queryName string) (<-chan amqp.Delivery, error) {
	msgs, err := c.channel.Consume(
		queryName,
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return nil, err
	}
	return msgs, nil
}

func (c *Consumer) handleError(message, reply, correlationId string) {
	responseData, err := json.Marshal(NewMessage(message, false))
	if err != nil {
		panic(err)
	}
	c.SendResult(responseData, reply, correlationId)
}

func (c *Consumer) SendResult(data []byte, reply, correlationId string) {
	err := c.channel.Publish("", reply, false, false, amqp.Publishing{
		ContentType:   "application/json",
		CorrelationId: correlationId,
		Body:          data,
	})
	if err != nil {
		panic(err)
	}
}

func (c *Consumer) follow() {
	var followData followData
	msgs, err := c.consumeMessages(config.QueueKey["user_follow"].QueueName)
	if err != nil {
		panic(err)
	}
	for msg := range msgs {
		log.Println("Follow")
		if err := json.Unmarshal(msg.Body, &followData); err != nil {
			c.handleError("Failed to parse message content", msg.ReplyTo, msg.CorrelationId)
			continue
		}
		data := c.followService.Follow(followData.UserId, followData.FollowId)
		if !data.Success {
			c.handleError(data.Message, msg.ReplyTo, msg.CorrelationId)
			continue
		}
		responseData, err := json.Marshal(data)
		if err != nil {
			c.handleError("Failed to marshal response data", msg.ReplyTo, msg.CorrelationId)
			continue
		}
		c.SendResult(responseData, msg.ReplyTo, msg.CorrelationId)
	}
}

func (c *Consumer) unfollow() {
	var unfollowData followData
	msgs, err := c.consumeMessages(config.QueueKey["user_unfollow"].QueueName)
	if err != nil {
		panic(err)
	}
	for msg := range msgs {
		log.Println("Unfollow")
		if err := json.Unmarshal(msg.Body, &unfollowData); err != nil {
			c.handleError("Failed to parse message content", msg.ReplyTo, msg.CorrelationId)
			continue
		}
		data := c.followService.Unfollow(unfollowData.UserId, unfollowData.FollowId)
		if !data.Success {
			c.handleError(data.Message, msg.ReplyTo, msg.CorrelationId)
			continue
		}
		responseData, err := json.Marshal(data)
		if err != nil {
			c.handleError("Failed to marshal response data", msg.ReplyTo, msg.CorrelationId)
			continue
		}
		c.SendResult(responseData, msg.ReplyTo, msg.CorrelationId)
	}
}

func (c *Consumer) allFollowers() {
	var allFollowers struct {
		UserId string `json:"user_id"`
	}
	msgs, err := c.consumeMessages(config.QueueKey["user_all_followers"].QueueName)
	if err != nil {
		panic(err)
	}
	for msg := range msgs {
		log.Println("All Followers")
		if err := json.Unmarshal(msg.Body, &allFollowers); err != nil {
			c.handleError("Failed to parse message content", msg.ReplyTo, msg.CorrelationId)
			continue
		}
		data, allFollowers := c.followService.GetAllFollowers(allFollowers.UserId)
		if !data.Success {
			c.handleError(data.Message, msg.ReplyTo, msg.CorrelationId)
			continue
		}
		var responseType struct {
			Message []model.Follow `json:"message"`
			Success bool           `json:"success"`
		}

		responseType.Message = allFollowers
		responseType.Success = data.Success

		responseData, err := json.Marshal(responseType)
		if err != nil {
			c.handleError("Failed to marshal response data", msg.ReplyTo, msg.CorrelationId)
			continue
		}
		c.SendResult(responseData, msg.ReplyTo, msg.CorrelationId)
	}
}

func (c *Consumer) isFollows() {
	var isFollows followData
	msgs, err := c.consumeMessages(config.QueueKey["user_is_follows"].QueueName)
	if err != nil {
		panic(err)
	}
	for msg := range msgs {
		log.Println("Is Follows")
		if err := json.Unmarshal(msg.Body, &isFollows); err != nil {
			c.handleError("Failed to parse message content", msg.ReplyTo, msg.CorrelationId)
			continue
		}
		data := c.followService.IsFollows(isFollows.FollowId, isFollows.UserId)
		responseData, err := json.Marshal(data)
		if err != nil {
			c.handleError("Failed to marshal response data", msg.ReplyTo, msg.CorrelationId)
			continue
		}
		c.SendResult(responseData, msg.ReplyTo, msg.CorrelationId)
	}
}

func (c *Consumer) Consume() {
	go c.follow()
	go c.unfollow()
	go c.allFollowers()
	go c.isFollows()
	select {}
}
