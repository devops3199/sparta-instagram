import React, { useState } from 'react';
import styled from 'styled-components';
import PersonIcon from '@material-ui/icons/Person';
import Logo from '../static/media/logo_left.png';
import NotificationBadge from './NotificationBadge';
import Permit from '../shared/Permit';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { apiKey } from '../shared/firebase';
import { logoutFB } from '../redux/modules/user';

const Header = (props) => {
    const [popup, setPopup] = useState(false);

    return (
      <>
        <HeaderContainer>
          <HeaderLeft>
            <LogoImage
              src={Logo}
              onClick={() => {
                history.push('/');
                setPopup(false);
              }}
            />
          </HeaderLeft>
          <HeaderRight>
            <Permit>
              <NotificationBadge setTrigger={setPopup} />
            </Permit>
            <PersonIcon
              style={{ fontSize: "35px", color: "#4e8d7c", cursor: "pointer" }}
              onClick={() => {
                setPopup(!popup);
              }}
            />
            <HeaderDropDown trigger={popup} setTrigger={setPopup} />
          </HeaderRight>
        </HeaderContainer>
      </>
    );
};

const HeaderContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #4e8d7c;
`;

const LogoImage = styled.img`
    width: 35px;
    cursor: pointer;
`;

const HeaderLeft = styled.div`
    
`;

const HeaderRight = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderDropDown = (props) => {
    const dispatch = useDispatch();

    const is_login = useSelector((state) => state.user.is_login);
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false;


    if(is_login && is_session) {
      return (props.trigger) ? (
        <>
          <PopupContainer>
            <span
              onClick={() => {
                history.push('/profile');
                props.setTrigger(false);
              }}
            >
              My Profile
            </span>
            <span
              onClick={() => {
                dispatch(logoutFB());
                history.push('/');
                props.setTrigger(false);
              }}
            >
              Logout
            </span>
          </PopupContainer>
        </>
      ) : null;
    }

    return (props.trigger) ? (
      <>
        <PopupContainer>
          <span
            onClick={() => {
              history.push("/login");
              props.setTrigger(false);
            }}
          >
            Login
          </span>
          <span
            onClick={() => {
              history.push("/register");
              props.setTrigger(false);
            }}
          >
            Register
          </span>
        </PopupContainer>
      </>
    ) : null;
};

const PopupContainer = styled.div`
    position: absolute;
    top: 58px;
    width: 120px;
    height: 120px;
    transform: translateX(-35%);
    background-color: #fdfdfd;
    box-shadow: 0px 7px 11px 0px rgba(174,168,168,0.74);
    -webkit-box-shadow: 0px 7px 11px 0px rgba(174,168,168,0.74);
    -moz-box-shadow: 0px 7px 11px 0px rgba(174,168,168,0.74);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & span {
        color: #2e2e2e;
        cursor: pointer;
        font-size: 18px;
        font-weight: 700;
        margin: 8px 0;
    }
`;

export default Header;