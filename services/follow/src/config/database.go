package config

import (
	"fmt"
	"log"
	"os"

	"github.com/UtkuAltnkaya/Social-Media-App/services/follow/src/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDatabase() *gorm.DB {
	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=follow port=%v", os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_PORT"))

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	// TODO
	// db = create_if_not_exist(db)

	log.Println("Connected to db")

	//MODELS
	db.AutoMigrate(&model.Follow{})

	return db
}

func create_if_not_exist(db *gorm.DB) *gorm.DB {
	var result int64
	log.Println(result)
	db.Raw("SELECT COUNT(datname) FROM pg_database WHERE datname = ?", os.Getenv("DB_NAME")).Scan(&result)
	if result != 0 {
		return db
	}
	createDatabaseQuery := fmt.Sprintf("CREATE DATABASE %s;", os.Getenv("DB_NAME"))
	err := db.Exec(createDatabaseQuery).Error
	if err != nil {
		panic("Failed to create database: " + err.Error())
	}
	sqlDB, err := db.DB()
	if err != nil {
		panic("Failed to get SQL database: " + err.Error())
	}
	sqlDB.Close()
	return connect_again()
}

func connect_again() *gorm.DB {
	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v",
		os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"), os.Getenv("DB_PORT"))
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to reconnect to the new database: " + err.Error())
	}
	return db
}
