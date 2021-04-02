import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputBox, CustomButton } from '../elements/index';
import { registerFB } from '../redux/modules/user';

const Register = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdConfirm, setPwdConfirm] = useState('');
    const [nickname, setNickname] = useState('');

    const emailCheck = (email) => {
        let reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
        return reg.test(email);
    };

    const register = () => {
        if(email === '' || pwd === '' || nickname === '') {
            alert('내용을 입력해주세요');
            return;
        }

        if(!emailCheck(email)){
            alert('이메일 양식이 다릅니다.');
            return;
        }

        if(pwd !== pwdConfirm){
            alert('비밀번호가 다릅니다.');
            return;
        }

        dispatch(registerFB(email, pwd, nickname));
    };

    return(
        <>
            <h3>CREATE ACCOUNT</h3>
            <InputBox placeholder='Email' type='email' margin='8px 0' _onChange={(e) => {setEmail(e.target.value);}} />
            <InputBox placeholder='Nickname' margin='8px 0' _onChange={(e) => {setNickname(e.target.value);}} />
            <InputBox placeholder='Password' type='password' margin='8px 0' _onChange={(e) => {setPwd(e.target.value);}} />
            <InputBox placeholder='Password Confirm' type='password' margin='8px 0' _onChange={(e) => {setPwdConfirm(e.target.value);}} />
            <CustomButton text='Register' radius='15px' color='#4e8d7c' margin='8px 0' _onClick={register} />
        </>
    );
}

export default Register;