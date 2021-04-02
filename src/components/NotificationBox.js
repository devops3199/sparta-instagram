import React from 'react';
import styled from 'styled-components';
import { ImageBox } from '../elements/index';

const NotificationBox = (props) => {
    return(
        <NotificationContainer>
            <ImageBox width='120px' height='120px' />
            <NotificationContent>
                <b>르탄이</b>님이 해당 게시물의 좋아요를 눌렀어요!
            </NotificationContent>
        </NotificationContainer>
    );
};

const NotificationContainer = styled.div`
    width: 100%;
    height: 150px;
    margin: 16px 0 16px 0;
    box-shadow: 0px 7px 11px 0px rgba(174,168,168,0.74);
    -webkit-box-shadow: 0px 7px 11px 0px rgba(174,168,168,0.74);
    -moz-box-shadow: 0px 7px 11px 0px rgba(174,168,168,0.74);
    display: flex;
    align-items: center;
`;

const NotificationContent = styled.div`
    margin: 0 0 0 8px;
`;

export default NotificationBox;