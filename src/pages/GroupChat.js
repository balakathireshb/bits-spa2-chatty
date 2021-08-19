/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */

/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import SockJsClient from 'react-stomp';
// material

import { Checkbox, FormGroup, FormControlLabel, Box, Grid, FormControl, Typography } from '@material-ui/core';

// components
import chatService from 'src/service/chatService';
import Input from 'src/components/_dashboard/chat/Input';
import Messages from 'src/components/_dashboard/chat/Messages';
import AppContext from 'src/components/AppContext';
import Page from '../components/Page';




// ----------------------------------------------------------------------

const SOCKET_URL = 'https://bala-spa-chat.azurewebsites.net/ws-chat/';


const messageAreaStyle = {
    display: 'block',
    transitionDuration: '0.3s',
    height: '25vw',
    width: '100%',
    scrollBehaviour: 'smooth',
    maxHeight: '30vw',
    overflowY: 'scroll'
}



export default function GroupChat() {
    const groupConfig = window.$groupConfig;
    const [topics, setTopics] = useState([]);
    const [messages, setMessages] = useState([]);
    const userSettings = useContext(AppContext);
    const { user } = userSettings;

    const onConnected = () => {
        console.log("Connected!!")
    }

    const onMessageReceived = (msg) => {
        console.log('New Message Received!!', msg);
        setMessages(messages.concat(msg));
    }

    const onSendMessage = (msgText) => {
        if (topics.length === 0) {
            alert("Select one or more groups to send message");
            return;
        }
        chatService.sendMessage(user.email, msgText, topics).then(res => {
            console.log('Sent', res);
        }).catch(err => {
            console.log('Error Occured while sending message to api');
        })
    }

    const onGroupSubsrciptionChange = (event) => {
        const group = event.target.value;
        const isSubscribed = event.target.checked;
        console.log(group);
        console.log(isSubscribed);
        const newTopics = getTopicListToSubscribe(group, isSubscribed);
        console.log(newTopics);
        setTopics(newTopics);
        sockJsClient.connect();
    }

    function getTopicListToSubscribe(group, isSubscribed) {
        if (isSubscribed) {
            return topics.concat(['/topic/'.concat(group)]);
        }
        const newTopics = [];
        topics.forEach((e) => {
            const grp = e.replace('/topic/', '');
            if (!(grp === group)) {
                newTopics.push('/topic/'.concat(grp));
            }
        });
        return newTopics;
    }
    let sockJsClient = null;

    return (
        <Page title="GroupChat | Chatty">
            <SockJsClient
                url={SOCKET_URL}
                topics={topics}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
                ref={(client) => { sockJsClient = client }}
            />

            <Grid container maxWidth="lg" align="center" direction="column">
                <Typography variant="h4" align="left">Hi, Select your topics.</Typography>
                <Box height={10} />
                <Typography variant="body1" align="left">You'll receive messages from all subscribed topics.</Typography>
                <Typography variant="body1" align="left"> Your messages will be published to all the selected topics.</Typography>
                <Box height={10} />
                <Box border={1} align="space-between">
                    <Typography align="left" variant="h6">Groups</Typography>
                    <FormControl component="groupset">
                        <FormGroup aria-label="position" row>
                            {groupConfig.map((val) =>
                                <FormControlLabel
                                    key={val.name}
                                    value={val.name}
                                    control={<Checkbox color="primary" />}
                                    label={val.name}
                                    labelPlacement="top"
                                    onChange={onGroupSubsrciptionChange}
                                />
                            )}
                        </FormGroup>
                    </FormControl>

                </Box>
            </Grid>

            <div style={messageAreaStyle} border={1}>
                <Messages
                    messages={messages}
                    currentUser={user.email}
                />
            </div>
            <Input onSendMessage={onSendMessage} />

        </Page>
    );
}
