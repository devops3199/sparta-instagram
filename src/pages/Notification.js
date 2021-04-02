import React from 'react';
import { useSelector } from 'react-redux';
import NotificationBox from '../components/NotificationBox';

const Notification = (props) => {
    const is_login = useSelector((state) => state.user.is_login);

    if(!is_login){
        return(
            <>
                <h3>Login First!</h3>
            </>
        );
    }
    
    return(
        <>
            <NotificationBox />
            <NotificationBox />
            <NotificationBox />
            <NotificationBox />
        </>
    );
};

export default Notification;