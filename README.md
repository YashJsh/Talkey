# Talkely

**Talkely** is a real-time chat application that allows users to connect and chat with others live. Designed with a sleek, responsive interface and powered by modern technologies, Talkely ensures seamless communication and an intuitive user experience.

---

## Features

- **Real-Time Messaging**: Communicate with others instantly using live updates.
- **Responsive Design**: A user-friendly and mobile-first interface, ensuring a smooth experience on any device.
- **User Authentication**: Secure login system to protect user data.
- **Effortless State Management**: Zustands simplify state handling, making the app fast and reliable.
- **Stylish Components**: Built with DaisyUI and Tailwind CSS for a modern look.
- **Scalable Backend**: Node.js and Express provide a robust server-side architecture.
- **Real-Time Communication**: Socket.IO enables live, two-way communication for chat functionality.
- **Data Persistence**: MongoDB stores user and chat data securely.

---

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Zustand**: A lightweight state management library.
- **DaisyUI**: Tailwind CSS components for beautiful, pre-styled UI elements.

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for building RESTful APIs.
- **Socket.IO**: Real-time, bidirectional, and event-based communication.
- **MongoDB**: NoSQL database for storing data.

---

## Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or cloud-based instance)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/talkely.git
   cd talkely
   ```

2. **Install Dependencies**
   - Install backend dependencies:
     ```bash
     cd server
     npm install
     ```
   - Install frontend dependencies:
     ```bash
     cd ../client
     npm install
     ```

3. **Set Up Environment Variables**
   Create a `.env` file in the `server` directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the Development Server**
   - Start the backend server:
     ```bash
     cd server
     npm run dev
     ```
   - Start the frontend development server:
     ```bash
     cd ../client
     npm start
     ```

5. **Access the Application**
   Open your browser and navigate to `http://localhost:3000` to use Talkely.

---

## Usage
1. Register or log in with your account.
2. Start chatting with other users in real time.
3. Enjoy a smooth and responsive user experience!

---

## Folder Structure
```
Talkely/
├── client/         # Frontend code (React, Tailwind CSS, DaisyUI)
├── server/         # Backend code (Node.js, Express, Socket.IO, MongoDB)
├── README.md       # Project documentation
└── .env.example    # Example environment variables
```

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request. Please ensure that your code adheres to the existing style and passes all tests.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgements
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [DaisyUI](https://daisyui.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)
