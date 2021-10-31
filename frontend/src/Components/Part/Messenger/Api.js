  
import axios from 'axios';

const url = 'http://localhost:4000';

// export const addUser = async (data) => {
//     try {
//         let response = await axios.post(`${url}/add`, data);
//         return response.data;
//     } catch (error) {
//         console.log('Error while calling addUser API ', error);
//     }
// }

export const getUsers = async () => {
    try {
        let response = await axios.get(`${url}/getUsers`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

export const setConversation = async (data) => {
    try {
        await axios.post(`${url}/addConversation`, data);
    } catch (error) {
        console.log('Error while calling setConversation API ', error);
    }
}

export const getConversation = async (users) => {
    try {
        const response = await axios.post(`${url}/getConversation`, users);
        return  response.data;
    } catch (error) {
        console.log('Error while calling getConversation API ', error);
    }
}

export const getMessages = async (id) => {
    try {
        let response = await axios.get(`${url}/getMessage/${id}`);
        return response.data
    } catch (error) {
        console.log('Error while calling getMessages API ', error);
    }
}

export const newMessages = async (data) => {
    try {
        return await axios.post(`${url}/addMessage`, data);
    } catch (error) {
        console.log('Error while calling newConversations API ', error);
    }
}