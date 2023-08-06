package model

type Follow struct {
	Id      uint   `json:"id" gorm:"primaryKey;autoIncrement"`
	UserId  string `json:"user_id"`
	Follows string `json:"follows"`
}
