import React, { useEffect } from 'react';
import styled from 'styled-components';
import Content from '../components/Content';
import InfinityScroll from '../shared/InfinityScroll';
import { useSelector, useDispatch } from 'react-redux';
import { getPostFB } from '../redux/modules/post';


const Main = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);
    const is_loading = useSelector((state) => state.post.is_loading);
    const paging = useSelector((state) => state.post.paging);

    useEffect(() => {
        if(post_list.length < 2) {
            dispatch(getPostFB());
        }
    }, []);

    const scroll = () => {
        dispatch(getPostFB(paging.next));
    };

    return(
        <MainContainer>
            <InfinityScroll                
                callNext={scroll}
                is_next={paging.next ? true : false}
                loading={is_loading}
            >
                {post_list.map((val, index) => {
                    if(val.user_info.user_id === user_info?.uid) {
                        return(
                            <Content key={val.id} {...val} is_me />
                        );
                    }
                    return(
                        <Content key={val.id} {...val} />
                    );
                })}
            </InfinityScroll>
        </MainContainer>
    );
};

const MainContainer = styled.div`
    width: 100%;
`;

export default Main;