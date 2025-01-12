-- Active: 1736391142125@@127.0.0.1@3306@lms

CREATE TABLE user(
    id int AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);


SELECT * FROM user


ALTER Table user add column `avatar`;