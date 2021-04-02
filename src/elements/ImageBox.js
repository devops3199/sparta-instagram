import React, { useState } from 'react';
import styled from 'styled-components';

const ImageBox = (props) => {
    const {shape, src, width, height, margin, _onClick} = props;
    
    const styles = {
        src: src,
        width: width,
        height: height,
        margin: margin,
    };

    if(shape === 'circle'){
        return (
            <ImageCircle {...styles} />
        );
    }

    return(
        <ImageDefault {...styles} onClick={_onClick} />
    );
};

ImageBox.defaultProps = {
    shape: '',
    src: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/af9ff5c1-2dff-400f-8128-0bd2b50001d0/defygz3-df195577-ea3f-4fab-90cc-eb6f8d82e5ab.jpg/v1/fill/w_1280,h_1280,q_75,strp/dog_vii_by_triyasisa_defygz3-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYWY5ZmY1YzEtMmRmZi00MDBmLTgxMjgtMGJkMmI1MDAwMWQwXC9kZWZ5Z3ozLWRmMTk1NTc3LWVhM2YtNGZhYi05MGNjLWViNmY4ZDgyZTVhYi5qcGciLCJoZWlnaHQiOiI8PTEyODAiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC9hZjlmZjVjMS0yZGZmLTQwMGYtODEyOC0wYmQyYjUwMDAxZDBcL3RyaXlhc2lzYS00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.ioW5OTVxDa3pu8K8vc-tIUlifRvRsMqBXp3tm4zKQyw',
    width: '0 px',
    height: '0 px',
    margin: '0',

};

const ImageDefault = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-image: url('${(props) => props.src}');
    background-size: cover;
    margin:  ${(props) => props.margin};
`;

const ImageCircle  = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 36px;
    background-image: url('${(props) => props.src}');
    background-size: cover;
    margin: 4px;
`;

export default ImageBox;