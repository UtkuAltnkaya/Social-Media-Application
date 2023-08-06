package src

import (
	"github.com/UtkuAltnkaya/Social-Media-App/services/follow/src/model"
	"gorm.io/gorm"
)

type FollowDb struct {
	*gorm.DB
}

type FollowService interface {
	Follow(userId, followId string) Message
	Unfollow(userId, followId string) Message
	GetAllFollowers(userID string) (Message, []model.Follow)
	IsFollows(userId, followId string) Message
}

func NewFollowService(db *gorm.DB) *FollowDb {
	return &FollowDb{db}
}

func (f *FollowDb) Follow(userId, followId string) Message {
	if message := f.IsFollows(userId, followId); message.Success {
		return NewMessage("Already followed", false)
	}

	f.Create(&model.Follow{
		UserId:  userId,
		Follows: followId,
	})

	return NewMessage("Successfully followed", true)
}

func (f *FollowDb) Unfollow(userId, followId string) Message {

	result := f.Delete(&model.Follow{}, "user_id = ? and follows = ?", userId, followId)
	if result.Error != nil {
		return NewMessage(result.Error.Error(), false)
	}
	if result.RowsAffected < 0 {
		return NewMessage("User not found", false)
	}
	return NewMessage("Successfully unfollowed", true)
}

func (f *FollowDb) GetAllFollowers(userID string) (Message, []model.Follow) {
	var allFollowers []model.Follow
	f.Where("follows = ?", userID).Find(&allFollowers)

	if len(allFollowers) == 0 {
		return NewMessage("User not found", false), nil
	}
	return NewMessage("Followers found", true), allFollowers
}

func (f *FollowDb) IsFollows(userId, followId string) Message {

	var follow *model.Follow
	f.Where("user_id = ? AND follows = ?", userId, followId).First(follow)
	if follow == nil {
		return NewMessage("Not follows", false)
	}

	return NewMessage("Follows", true)
}
