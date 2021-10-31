import { useContext, useEffect, useState } from 'react'
import { makeStyles, Box, Typography } from "@material-ui/core";

import { UserContext } from '../../../../ContextProvider/UserProvider';
import {AccountContext} from '../../../../ContextProvider/AccountProvider';

import { setConversation,getConversation } from '../Api';
const useStyles = makeStyles({
    component: {
        height: 40,
        display: 'flex',
        padding: '13px 0',
        cursor: 'pointer'
    },
    displayPicture: {
        width: 50,
        height: 50,
        objectFit: 'cover',
        borderRadius: '20%',
        padding: '0 10px'
    },
    container: {
        display: 'flex'
    },
    timestamp: {
        fontSize: 12,
        marginLeft: 'auto',
        color: '#00000099',
        marginRight: 20
    },
    text: {
        display: 'block',
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 14
    }
})

const Conversation = ({ user }) => {
    const classes = useStyles();
    const url = user.imageUrl || 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png';
    
    const { setPerson } = useContext(UserContext);
    const { account, socket, newMessageFlag }  = useContext(AccountContext);

    const [message, setMessage] = useState({});

    useEffect(() => {
        const getConversationMessage = async() => {
            const data = await getConversation({ sender: localStorage.getItem("id"), receiver: user._id });
            // if(data){
                // console.log
            setMessage({ text: data?.message, timestamp: data?.updatedAt });
            console.log(localStorage.getItem("id"))
            // }
        }
        getConversationMessage();
    }, [newMessageFlag]);

    const getUser = async () => {
        setPerson(user);
        await setConversation({ senderId: localStorage.getItem("id"), receiverId: user._id });
    }

    const getTime = (time) => {
        return time < 10 ? '0' + time : time; 
    } 

    return (
        <Box className={classes.component} onClick={() => getUser()}>
            <Box>
                <img src={user.avatar ? user.avatar : "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png" }  className={classes.displayPicture} />
            </Box>
            <Box style={{width: '100%'}}>
                <Box className={classes.container}>
                    <Typography>{user.name}</Typography>
                    <Typography className={classes.timestamp}>
                        {getTime(new Date(message.timestamp).getHours())}:{getTime(new Date(message.timestamp).getMinutes())}
                    </Typography>        
                </Box>
                <Box>
                    <Typography className={classes.text}>{message.text}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Conversation;