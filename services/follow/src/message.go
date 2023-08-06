package src

type Message struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
}

func NewMessage(data string, success bool) Message {
	return Message{
		Message: data,
		Success: success,
	}

}
