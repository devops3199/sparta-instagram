import React, { useEffect } from 'react';
import styled from 'styled-components';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/configureStore';
import Header from './components/Header';
import Permit from './shared/Permit';
import { apiKey } from './shared/firebase';
import { useDispatch } from 'react-redux';
import { loginCheckFB } from './redux/modules/user';
import { Login, Register, Main, Add, Notification, Edit, Detail, Profile } from './pages/page';

const App = (props) => {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  useEffect(() => {
    if(is_session){
      dispatch(loginCheckFB());
    }
  }, []);

  const ScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <AppContainer>
      <Header></Header>
      <ConnectedRouter history={ history }>
        <Route path='/' exact component={ Main } />
        <Route path='/profile' exact component={ Profile } />
        <Route path='/login' exact component={ Login } />
        <Route path='/register' exact component={ Register } />
        <Route path='/add' exact component={ Add } />
        <Route path='/edit/:id' exact component={ Edit } />
        <Route path='/detail/:id' exact component={ Detail } />
        <Route path='/notification' exact component={ Notification } />
      </ConnectedRouter>
      <Permit>
        <FloatingButton onClick={() => {history.push('/add')}}>+</FloatingButton>
        <GoTopButton onClick={ScrollTop}><ArrowDropUpIcon /></GoTopButton>
      </Permit>
    </AppContainer>
  );
};

const AppContainer = styled.main`
  width: 700px;
  margin: 0 auto;
  text-align: center;

  @media screen and (max-width: 800px) {
    width: 80vw;
  }  
`;

const FloatingButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #4e8d7c;
  color: #fff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  border: none;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const GoTopButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #4e8d7c;
  color: #fff;
  box-sizing: border-box;
  font-weight: 800;
  position: fixed;
  bottom: 110px;
  right: 16px;
  text-align: center;
  border: none;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  & svg {
    font-size: 40px;
  }
`;

export default App;
