import React from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import Logout from './Logout';
import Messages from './Messages';
const ChatContainer = ({ currentChat }) => {
    const handleSendMsg = (msg) => {};
    return (
        <Container>
            <div className='chat-header'>
                <div className='user-details'>
                    <div className='avatar'>
                        <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt='' />
                    </div>
                    <div className='username'>
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <Messages />
            <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
    );
};

const Container = styled.div`
    padding-top: 1rem;
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: cener;
        padding: 0 2rem;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 2.5rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
    }
`;

export default ChatContainer;
