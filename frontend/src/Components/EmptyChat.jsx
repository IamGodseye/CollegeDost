import React from 'react';
import { Box,Typography } from '@material-ui/core';
import './Messenger.css';


const EmptyChat = () => {
    const s = "https://ik.imagekit.io/ag/wp-content/uploads/2015/01/QR-connected.png";
    return (
        <Box>
            <Typography style={{
                textAlign:'center',
                justifyContent:'center'
            }}>
                Click On a User To Start the Chat !
            </Typography>
        </Box>
    )
}

export default EmptyChat
