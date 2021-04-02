import { auth } from '../../shared/firebase';
import firebase from 'firebase/app';

const initialState = {
    user : {},
    is_login: false,
};

// actions
const LOG_OUT = 'user/LOG_OUT';
const GET_USER = 'user/GET_USER';
const SET_USER = 'user/SET_USER';

// action creators
export const logOut = (user) => {
    return { type: LOG_OUT, user };
};

export const getUser = (user) => {
    return { type: GET_USER, user };
};

export const setUser = (user) => {
    return { type: SET_USER, user };
};

export const registerFB = (email, pwd, nickname) => {
    return function (dispatch, getState, {history}){
        auth.createUserWithEmailAndPassword(email, pwd)
            .then((user) => {
                auth.currentUser.updateProfile({
                    displayName: nickname,
                }).then(() => {
                    dispatch(
                      setUser({
                        nickname: nickname,
                        email: email,
                        user_profile: 'https://png.pngitem.com/pimgs/s/22-223968_default-profile-picture-circle-hd-png-download.png',
                        uid: user.user.uid,
                      })
                    );
                    history.push('/');
                }).catch((err) => {
                    console.log(err);
                });
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                if(errorCode === 'auth/email-already-in-use'){
                    alert('이미 존재하는 Email입니다.');
                }
                console.log(errorCode, errorMessage);
            });
    };
};

export const logoutFB = () => {
    return function (dispatch, getState, {history}) {
        auth.signOut().then(() => {
            dispatch(logOut());
            history.replace('/');
        });
    };
};

export const loginFB = (email, pwd) => {
    return function (dispatch, getState, { history }) {
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
            auth
            .signInWithEmailAndPassword(email, pwd)
            .then((user) => {
                dispatch(setUser({ nickname: user.user.displayName, email: email, user_profile: 'https://png.pngitem.com/pimgs/s/22-223968_default-profile-picture-circle-hd-png-download.png', uid: user.user.uid}));
                history.push('/');
            })
            .catch((error) => {
              let errorCode = error.code;
              let errorMessage = error.message;
              if (errorCode === "auth/wrong-password") {
                alert("비밀번호가 다릅니다.");
              }
              console.log(errorCode, errorMessage);
            });
        });
    };
};

export const loginCheckFB = () => {
    return function(dispatch, getState, {history}){
        auth.onAuthStateChanged((user) => {
            if(user){
                dispatch(setUser({nickname: user.displayName, user_profile: 'https://png.pngitem.com/pimgs/s/22-223968_default-profile-picture-circle-hd-png-download.png', email: user.email, uid: user.uid,}));
            } else {
                dispatch(logOut());
            }
        });
    };
};

//reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'user/SET_USER':
            state.user = {...action.user};
            state.is_login = true;
            return state;
        case 'user/GET_USER':
            break;
        case 'user/LOG_OUT':
            state.user = {};
            state.is_login = false;
            return state;
        default:
            return state;
    }
};