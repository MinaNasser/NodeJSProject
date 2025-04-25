# Video Management Backend

A comprehensive Node.js backend application for video management with MongoDB as the database.

## Features

- **User Authentication**
  - User registration, login, password reset
  - JWT-based authentication

- **Video Management**
  - APIs for creating, updating, deleting, and retrieving video metadata
  - Video upload using Multer
  - Storage options: local server or cloud storage (Google Cloud Storage)
  - Video processing with FFmpeg (format conversion, compression, thumbnails)

- **Comments & Replies**
  - Post, update, and delete comments on videos
  - Reply to comments
  - Real-time interaction using Socket.io

- **Follow System**
  - Follow/unfollow other users
  - Get notifications for new content from followed users

- **Like/Dislike System**
  - Like or dislike videos and comments
  - Track user interactions

- **Real-time Notifications**
  - Notifications for comments, replies, likes/dislikes, and follows
  - Implemented using Socket.io

## MongoDB Collections

- **Users**: Stores user information (username, email, hashed password, role, etc.)
- **Videos**: Stores video metadata (title, description, file path, uploader, etc.)
- **Comments**: Stores video comments
- **Replies**: Stores replies to comments
- **Likes/Dislikes**: Tracks user interactions with content
- **Follows**: Tracks user follow relationships
- **Notifications**: Stores user notifications

## API Documentation

API documentation is available via Swagger UI at `/api-docs` when the server is running.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- FFmpeg (for video processing)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

\`\`\`
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_STORAGE_KEY=your_cloud_storage_credentials_json
\`\`\`

### Installation

1. Clone the repository
2. Install dependencies: