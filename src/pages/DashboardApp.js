/* eslint-disable import/no-unresolved */
// react
import { useContext, useState, useRef } from 'react';
// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import AppContext from 'src/components/AppContext';
import SockJsClient from 'react-stomp';
import Page from '../components/Page';
import { CurrentActiveUsers, GroupTrends, MessagesPerMinute } from '../components/_dashboard/app';

// ----------------------------------------------------------------------

const SOCKET_URL = 'https://bala-spa-chat.azurewebsites.net/ws-chat/';

export default function DashboardApp() {
  const userSettings = useContext(AppContext);
  // const [msgPerMin, setMsgPerMin] = useState(0);
  // const [activeUsers, setActiveUsers] = useState(0);
  const groupTrendRef = useRef();
  const msgPerMinRef = useRef();
  const activeUsersRef = useRef();

  const onMessageReceived = (msg, topic) => {
    console.log('New Message Received on:', topic);
    console.log('payload', msg);
    if (topic === '/topic/gt') {
      groupTrendRef.current.addNewData(msg);
    } else if (topic === '/topic/mpm') {
      msgPerMinRef.current.setMPM(msg);
      // setMsgPerMin(msg);
    } else if (topic === '/topic/au') {
      activeUsersRef.current.setAUC(msg);
      // setActiveUsers(msg);
    }
  };

  return (
    <Page title="Dashboard | Chatty">
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/gt', '/topic/mpm', '/topic/au']}
        onConnect={console.log('Connected')}
        onDisconnect={() => console.log('Disconnected!')}
        onMessage={(msg, topic) => onMessageReceived(msg, topic)}
        debug={false}
      />
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">
            Hi {userSettings.user.fName} {userSettings.user.lName}, Welcome back
          </Typography>
        </Box>
        <Grid container spacing={3} direction="row">
          <Grid item xs={12} sm={6} md={3}>
            <MessagesPerMinute ref={msgPerMinRef} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CurrentActiveUsers ref={activeUsersRef} />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <GroupTrends ref={groupTrendRef} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
