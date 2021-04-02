import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';

const CustomButton = (props) => {
    const { width, padding, color, text, margin, radius, is_disable, children, _onClick } = props;

    const styles = {
        margin: margin,
        width: width,
        padding: padding,
        radius: radius,
    };

    return (
        <>
            <MyButton {...styles} color={color} is_disable={is_disable} onClick={_onClick} >
                {text? text : children}
            </MyButton>
        </>
    );
};

CustomButton.defaultProps = {
    width: '100%',
    padding: '12px 0',
    color: '#212121',
    text: false,
    margin: false,
    radius : false,
    children:  null,
    is_disable: false,
    _onChange : () => {},
}

const MyButton = styled.button`
    width: ${(props) => props.width};
    height: 50px;
    font-weight: 700;
    background-color: ${(props) => props.color};
    color: #fff;
    padding: ${(props) => props.padding};
    box-sizing: border-box;
    border: none;
    outline: none;
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
    ${(props) => (props.radius ? `border-radius: ${props.radius};` : '')};
    ${(props) => (props.is_disable ? 'opacity: 0.2;' : '')};
    ${(props) => (props.is_disable ? '' : 'cursor: pointer;')};
`;

export default CustomButton;