/* eslint-disable prettier/prettier */
import { React, useRef, useEffect } from 'react';

// material
import { colors } from '@material-ui/core';


//---------------------------------------------------------------



const Messages = ({ messages, currentUser }) => {
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);


    const renderMessage = (message) => {
        console.log(`currentuser=${currentUser}`);
        console.log(`sender->${message.sender}`);
        const { sender, content, topic } = message;
        const messageFromMe = currentUser === message.sender;
        console.log(messageFromMe);
        const className = messageFromMe ? 'Messages-message.currentUser' : 'Messages-message';
        return (
            <li className={className}>
                <span className="avatar" style={{ backgroundColor: colors.grey }} />
                <div className="Message-content">
                    <div className="username">{sender} - {topic}</div>
                    <div className="text">{content}</div>
                </div>
            </li>
        );
    };

    return (<div> <ul className="messages-list">{messages.map((msg) => renderMessage(msg))}</ul>
        <div ref={messagesEndRef} /></div>);

};

export default Messages;
