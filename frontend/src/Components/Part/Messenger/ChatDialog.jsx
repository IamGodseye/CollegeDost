import { useContext } from 'react';
import { Dialog, makeStyles, withStyles, Box, CircularProgress } from '@material-ui/core';
import { UserContext } from '../../../ContextProvider/UserProvider';
import Menu from './menu/Menu';
import ChatBox from './chat/ChatBox';
import EmptyChat from './chat/EmptyChat';
import { AccountContext } from '../../../ContextProvider/AccountProvider';
import Header from '../Header';

const useStyles = makeStyles({
    component: {
        display: 'flex'
    },
    leftComponent: {
        width: '30%'
    },
    rightComponent: {
        width: '70%',
        height: '60%',
        borderLeft: '1px solid rgba(0, 0, 0, 0.14)'
    }
})

const style = {
    dialogPaper: {
        height: '100%',
        width: '75%',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: 0,
        boxShadow: 'none',
        overflow: 'hidden',
        marginTop:'20%'
    }
};

const ChatDialog = ({ classes }) => {
    const classname = useStyles();

    const { person } = useContext(UserContext);
    const { account } = useContext(AccountContext);

    return (
        <>
        <Header/>
        <Dialog open={true} classes={{ paper: classes.dialogPaper }} BackdropProps={{ style: { backgroundColor: 'unset' } }}>
            <Box className={classname.component}>
                <Box className={classname.leftComponent}>
                    <Menu />
                </Box>
                <Box className={classname.rightComponent}>
                    {
                        Object.keys(person).length ? <ChatBox /> : <EmptyChat />
                    }
                </Box>
            </Box>
        </Dialog>
        </>
    )
}

export default withStyles(style)(ChatDialog);