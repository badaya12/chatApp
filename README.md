# Real-Time Chat Application with Generative AI Capabilities

This project is a real-time chat application using the MERN stack (MongoDB, Express, React, Node.js) with Socket.io for real-time communication. It also has Generative AI capabilities that allow users to have an AI assistant that can interact with other users in real-time on their behalf. The AI assistant is enabled only when the user is offline and has set their status as BUSY. The application uses the Gemini API for generative responses and Socket.io for real-time chat functionality.

# Setup Instructions

Clone the repository:

```bash
git clone https://github.com/badaya12/chatApp.git
```

## Install dependencies:

```bash
cd server
npm install
```

## Set up environment variables:
* Create a .env file in the root directory.
* Add your MongoDB URI, JWT secret key, and Gemini API key to the .env file:
```text
MONGODB_URI=mongodb+srv://manan19badaya6:BaIWiGvnKL8iK7og@cluster0.nrwm1ay.mongodb.net/
JWT_SECRET_KEY=TEST123
API_KEY=your-gemini-api-key
```

## Run the development server:
```bash
npm run dev
```
## Access the application at <http://localhost:5001> in your browser



# API Endpoints

## User Routes
 * **POST** `/api/user/register`: Register a new user.
    * Input : `{ name, email, password }`
    * Output : `{ _id, name, email, token }`
 * **POST** `/api/user/login`: Login an existing user.
    * Input : `{ email, password }`
    * Output : `{ _id, name, email, token, status }`
 * **GET** `/api/user/find/:userId`: Get user details by ID.
    * Output: `User object`
 * **GET** `/api/user/`: Get all users.
    * Output: `Array of user objects`
 * **POST** `/api/user/changeStatus`: Change user status.
    * Input: `{ userId, status }`
    * Output: `{ message }`

## Message Routes
*  **GET** `/api/message/getMessages/:chatId`: Get messages in a chat.
   * Output : `Array of message objects`
* **POST** `/api/message/createMessages/`: Create a new message.
  * Input : `{ chatId, senderId, text }`
  * Output : `Created message object`

## Chat Routes
* **POST** `/api/chat/createChat`: Create a new chat.
  * Input : `{ firstId, secondId }`
  * Output : `Created chat object`
* **GET** `/api/chat/find/:userId`: Find chats by user ID.
  * Output: `Array of chat objects`
* **GET** `/api/chat/find/:firstId/:secondId`: Find a chat between two users.
  * Output: `Chat object`
