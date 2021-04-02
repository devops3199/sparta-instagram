import React, { useState, useRef, useEffect } from 'react';
import PhotoIcon from '@material-ui/icons/Photo';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { InputBox, CustomButton } from '../elements/index';
import { setPreview } from '../redux/modules/image';
import { editPostFB } from '../redux/modules/post';

const Edit = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state) => state.post.list);
    
    const post_id = props.match.params.id;
    const is_edit = post_id ? true: false;

    let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

    const uploading = useSelector((state) => state.image.uploading);
    const fileInput = useRef();

    const {history} = props;

    const [contents, setContents] = useState(_post ? _post.contents : '');

    const [imageName, setImageName] = useState(null);
    const [layout, setLayout] = useState('top');
    const [disable, setDisable] = useState(true);

    useEffect(() => {
        if(is_edit && !_post){
            history.goBack();
            return;
        }

        if(is_edit) {
            dispatch(setPreview(_post.image_url));
        }

        (layout === '' || contents === '') ? setDisable(true) : setDisable(false);
    }, [layout, contents]);

    const editPost = () => {
        if(disable){
            return;
        }

        let temp = {
            layout: layout,
            contents: contents,
        };
        dispatch(editPostFB(post_id, temp));
    };

    const selectFile = (e) => {
        const reader = new FileReader();
        const file = fileInput.current.files[0];

        setImageName(file.name);
  
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            dispatch(setPreview(reader.result));
        }
    };

    if(!is_login){
        return(
            <>
                <h3>Login First!</h3>
            </>
        );
    }

    return (
        <>
            <h3>게시물 수정</h3>
            <Layout>
                <h4>Layout</h4>
                <select name="layout" value={layout} onChange={(e) => { setLayout(e.target.value); }}>
                    <option value="left">왼쪽(내용) + 오른쪽(이미지)</option>
                    <option value="right">왼쪽(이미지) + 오른쪽(내용)</option>
                    <option value="top">위(내용) + 아래(이미지)</option>
                </select>
            </Layout>
            <FileUpload>
                <h4>Image</h4>
                <label htmlFor='input-file'>{imageName ? imageName : '이미지를 고르세요!'} <PhotoIcon style={{color: '#cacaca', margin: '0 4px'}} /> </label>
                <input id='input-file' type='file' accept='image/*' ref={fileInput} onChange={selectFile} disabled={uploading} />
            </FileUpload>
            <PreviewContainer>
                <img src={preview ? preview : 'http://via.placeholder.com/400x300'} />
            </PreviewContainer>
            <InputBox textarea value={contents} placeholder='내용' margin='8px 0' _onChange={(e) => {setContents(e.target.value);}} />
            <CustomButton text='Edit Your Post!' radius='15px' color='#4e8d7c' margin='8px 0' is_disable={disable} _onClick={editPost} />
        </>
    );
};

const Layout = styled.div`
    text-align: left;

    & select {
        width: 100%;
        height: 40px;
        padding: 0 8px;
        border: 1px solid #cacaca;
    }
`;

const FileUpload = styled.div`
    text-align: left;
    margin: 0 0 16px 0;
    & label {
        display: flex;
        align-items: center;
        height: 40px;
        border: 1px solid #cacaca;
        color: #cacaca;
        cursor: pointer;
        box-sizing: border-box;
        padding: 0 8px;
    }
    & input {
        display: none;
    }
`;

const PreviewContainer = styled.div`
    margin: 0 0 16px 0;

    & img {
        max-width: 100%;
    }
`;

export default Edit;