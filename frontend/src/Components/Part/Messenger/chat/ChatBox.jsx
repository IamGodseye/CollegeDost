import { useContext, useState, useEffect } from 'react';
import { Box } from '@material-ui/core';

import { UserContext } from '../../../../ContextProvider/UserProvider';
import {AccountContext} from '../../../../ContextProvider/AccountProvider';
import { getConversation,setConversation } from '../Api';

//components
import ChatHeader from './ChatHeader';
import Messages from './Messages';

const ChatBox = () => {
    const { person, setPerson } = useContext(UserContext);
    const { account } = useContext(AccountContext);

    const [conversation, setConversation] = useState({});
    
    useEffect(() => {
        const getConversationDetails = async () => {
            let data = await getConversation({ sender: localStorage.getItem("id"), receiver: person._id });
            setConversation(data);
        }
        getConversationDetails();
    }, [person._id]);

    return (
        <Box style={{height: '75%'}}>
            <ChatHeader person={person} />
            <Messages person={person} conversation={conversation} />
        </Box>
    )
}

export default ChatBox;