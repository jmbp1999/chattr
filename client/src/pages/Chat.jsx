import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { allUsersRoute, host } from '../utils/ApiRoutes';
import ChatContainer from '../components/ChatContainer';
import Contacts from '../components/Contacts.jsx';
import Welcome from '../components/Welcome';
import { io } from 'socket.io-client';

export default function Chat() {
    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function getLoggedUser() {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login');
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
                setIsLoaded(true);
            }
        }
        getLoggedUser();
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit('add-user', currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        async function getAllUsers() {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    console.log(data);
                    setContacts(data.data);
                } else {
                    navigate('/setAvatar');
                }
            }
        }
        getAllUsers();
    }, [currentUser]);
    const handleChatChange = (chat) => {
        console.log(chat);
        setCurrentChat(chat);
    };
    return (
        <>
            <Container>
                <div className='container'>
                    <Contacts contacts={contacts} changeChat={handleChatChange} />
                    {currentChat === undefined ? <Welcome></Welcome> : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />}
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;
