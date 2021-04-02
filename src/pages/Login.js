import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InputBox, CustomButton } from '../elements/index';
import { loginFB } from '../redux/modules/user';

const Login = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [disable, setDisable] = useState(true);

    const emailCheck = (email) => {
        let reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
        return reg.test(email);
    };

    useEffect(() => {
        (email === '' || pwd === '') ? setDisable(true) : setDisable(false);
    },[email, pwd]);

    const login = () => {
        if(disable){
            return;
        }

        if(email === '' || pwd === ''){
            alert('내용을 입력하세요.');
            return;
        }

        if(!emailCheck(email)){
            alert('이메일 양식이 다릅니다.');
            return;
        }

        dispatch(loginFB(email, pwd));
    };

    return(
        <>
            <h3>Login</h3>
            <InputBox placeholder='Email' type='email' margin='8px 0' _onChange={(e) => {setEmail(e.target.value);}} />
            <InputBox placeholder='Password' type='password' margin='8px 0' _onChange={(e) => {setPwd(e.target.value);}} />
            <CustomButton text='Continue' radius='15px' color='#4e8d7c' margin='8px 0' is_disable={disable} _onClick={login} />
        </>
    );
};

export default Login;