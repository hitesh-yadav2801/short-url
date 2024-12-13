# URL Shortener Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Role-Based Access Control](#role-based-access-control)
- [Routes](#routes)

## Introduction
This is a URL shortener application built with Node.js and Express.js. It allows users to create short URLs, track visit history, and manage their short URLs with role-based access control, ensuring that normal users can only see their own URLs while admins have access to all URLs.

## Features
- User Registration and Login
- Role-Based Access Control (RBAC)
- Short URL Creation
- View and Management of Short URLs
- Visit History Tracking for Each Short URL
- User-friendly EJS rendered frontend

## Project Struture

/url-shortener
│
├── /controllers
│   ├── url.js                          # URL management logic
│   └── user.js                         # User management logic
├── /middlewares
│   ├── auth.js                         # JWT authentication middleware
├── /models
│   ├── url.js                          # URL schema/model
│   └── user.js                         # User schema/model
├── /routes
│   ├── staticRouter.js                 # Static routes (home, login, signup)
│   └── url.js                         # url routes
|   └── user.js                         # user routes
├── /views
│   ├── home.ejs                        # Homepage
│   ├── login.ejs                       # Login page
│   ├── signup.ejs                      # Signup page
├── /service                             # Services or utilities (if any)
|   ├── auth.js                        # Auth services
├── index.js                            # Main application entry file
├── package.json                        # Project metadata and dependencies
└── README.md                           # Project documentation


## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token) for authentication
- EJS (Embedded JavaScript) for templating

## Setup instructions

1. Clone the reposiotory

    git clone <link>
    cd SHORT_URL

2. npm install

3. setup .env file

    - add: PORT, JWT_SECRET

4. Start:
    npm start, nodemon start


## Routes

Public Routes-
GET / - Render the homepage.
GET /signup - Render the signup page.
GET /login - Render the login page.
POST /signup - Handle user signup.
POST /login - Handle user login.
GET /logout - Logout the user and clear session cookies.
GET /:shortId - Redirect to the original URL and track visit history.
GET /analytics/:shortId - Fetch analytics for a specific short URL.

Authenticated User Routes-
GET /url - Fetch all URLs created by the logged-in user (roles: user, admin).
POST /url - Create a new short URL (role: user).

Admin Routes-
GET /user/admin/urls - Fetch all URLs created by all users (role: admin).