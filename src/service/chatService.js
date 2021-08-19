/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-unresolved
import Axios from "axios";

const baseURL = `https://bala-spa-chat.azurewebsites.net/api/`;

const api = Axios.create({
    baseURL,
});

const chatService = {
    getMessages: (groupId) => {
        console.log('Calling get messages from API');
        return api.get(`messages/${groupId}`);
    },

    sendMessage: (username, text, topics) => {
        const msg = {
            sender: username,
            content: text,
            topics
        }
        console.log(msg);
        console.log(JSON.stringify(msg));
        return api.post(`send`, msg);
    }
}


export default chatService;
