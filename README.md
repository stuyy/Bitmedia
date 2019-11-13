# Chatterbit.io

A fun social media app project. Allowing users to post updates, create & organize their tasks with a to-do list, chat with others, and more.

## Installation

Clone this repository

`npm install`

Make sure to have a MySQL server setup, as well as environment variables

- DB_NAME
- DB_PASS
- DB_HOST
- DB_USER
- PORT

These environment variables are for database and the server to listen on.

# Developer Notes

These are notes I left for myself, you can read them if you wish, but they only serve to help me keep track of implementations

## Local, Google, Facebook, and GitHub Authorization

- Currently we have one Users table to represent our records for Users who are registered. However we know if a User registered locally, they would have a password.
- In the database, Users who don't have a password have their password field set to NULL.
- When user logs in with Google, FB, or GitHub, the e-mail address on their account is used as a primary key in our User table.
- If user wants to login locally, they must have a password. However, the password they use for their third-party accounts will not work. So we force them to reset their password.
