const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const socket = require('socket.io');
const app = express();
require('dotenv').config();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB Connection Successfull');
    })
    .catch((error) => console.log(`${error} did not connect`));

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on PORT ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    console.log(onlineUsers);

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(data);
        if (sendUserSocket) {
            const re = socket.to(sendUserSocket).emit('msg-receive', data.msg);
            console.log(re);
        }
    });
});
