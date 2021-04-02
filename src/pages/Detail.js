import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePostFB } from '../redux/modules/post';
import { ImageBox } from '../elements/index';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatIcon from '@material-ui/icons/Chat';

const Detail = (props) => {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const post_index = post_list.findIndex(val => val.id === id);
    const post = post_list[post_index];

    useEffect(() => {

        if(post){
            return;
        }

        dispatch( getOnePostFB(id) );

    }, []);

    if(post.layout === 'top'){
        return(
            <>
            <h3>상세 페이지</h3>
            <ContentContainer>
              <ProfileContainer>
                <div>
                  <ImageBox shape="circle" src={post.user_info.user_profile} />
                  <b>{post.user_info.nickname}</b>
                </div>
                <ContentInfo>
                  <span>{post.insert_dt}</span>
                </ContentInfo>
              </ProfileContainer>
              <LayoutTop>
                <LayoutContentTop>
                  <span>{post.contents}</span>
                </LayoutContentTop>
                <LayoutImageTop>
                  <ImageBox width="100%" height="350px" src={post.image_url} />
                </LayoutImageTop>
              </LayoutTop>
              <LikeContainer>
                <span>좋아요 {post.likes}개</span>
                <IconConainter>
                <FavoriteBorderIcon
                      style={{
                        color: "#ff005c",
                        cursor: "pointer",
                        margin: "0 8px 0 0",
                      }}/>
                  <ChatIcon style={{ color: "#4e8d7c", cursor: "pointer" }} />
                </IconConainter>
              </LikeContainer>
            </ContentContainer>
          </>
        );
    } else if(post.layout === 'left'){
        return(
            <>
            <h3>상세 페이지</h3>
            <ContentContainer>
              <ProfileContainer>
                <div>
                  <ImageBox shape="circle" src={post.user_info.user_profile} />
                  <b>{post.user_info.nickname}</b>
                </div>
                <ContentInfo>
                  <span>{post.insert_dt}</span>
                </ContentInfo>
              </ProfileContainer>
              <LayoutLeft>
                <LayoutContentSide>
                  <span>{post.contents}</span>
                </LayoutContentSide>
                <LayoutImageSide>
                  <ImageBox width="100%" height="350px" src={post.image_url} />
                </LayoutImageSide>
              </LayoutLeft>
              <LikeContainer>
                <span>좋아요 {post.likes}개</span>
                <IconConainter>
                <FavoriteBorderIcon
                      style={{
                        color: "#ff005c",
                        cursor: "pointer",
                        margin: "0 8px 0 0",
                      }}/>
                  <ChatIcon style={{ color: "#4e8d7c", cursor: "pointer" }} />
                </IconConainter>
              </LikeContainer>
            </ContentContainer>
          </>
        );
    } else {
        return(
            <>
            <h3>상세 페이지</h3>
            <ContentContainer>
              <ProfileContainer>
                <div>
                  <ImageBox shape="circle" src={post.user_info.user_profile} />
                  <b>{post.user_info.nickname}</b>
                </div>
                <ContentInfo>
                  <span>{post.insert_dt}</span>
                </ContentInfo>
              </ProfileContainer>
              <LayoutRight>
                <LayoutContentSide>
                  <span>{post.contents}</span>
                </LayoutContentSide>
                <LayoutImageSide>
                  <ImageBox width="100%" height="350px" src={post.image_url} />
                </LayoutImageSide>
              </LayoutRight>
              <LikeContainer>
                <span>좋아요 {post.likes}개</span>
                <IconConainter>
                <FavoriteBorderIcon
                      style={{
                        color: "#ff005c",
                        cursor: "pointer",
                        margin: "0 8px 0 0",
                      }}/>
                  <ChatIcon style={{ color: "#4e8d7c", cursor: "pointer" }} />
                </IconConainter>
              </LikeContainer>
            </ContentContainer>
          </>
        );
    }
};

const ContentContainer = styled.section`
    width: 100%;
    margin: 16px 0 16px 0;
    box-shadow: 0px 7px 11px 0px rgba(174,168,168,0.74);
    -webkit-box-shadow: 0px 7px 11px 0px rgba(174,168,168,0.74);
    -moz-box-shadow: 0px 7px 11px 0px rgba(174,168,168,0.74);
`;

const ProfileContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 8px;
    & > div {
        display: flex;
        align-items: center;
    }
`;

const ContentInfo = styled.div`
    & span {
        margin: 0 8px 0 0;
    }
    & button {
        background-color: #f9f9f9;
        border: 2px solid #4e8d7c;
        border-radius: 5px;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
    }
`;

const LayoutLeft = styled.div`
    display: flex;
    flex-direction: row;
`;

const LayoutRight = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;

const LayoutTop = styled.div`

`;

const LayoutContentSide = styled.div`
    width: 100px;
    text-align: left;
    padding: 0 8px 16px 8px;
    background-color: #f0f0f0;
`;

const LayoutImageSide = styled.div`
    width: 600px;
    border-radius: 15px;
    & div {
      cursor: pointer;
    }
`;

const LayoutContentTop = styled.div`
    text-align: left;
    padding: 0 8px 16px 8px;
`;

const LayoutImageTop = styled.div`
    & div {
      cursor: pointer;
    }
`;


const LikeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 8px;
    font-weight: 700;
`;

const IconConainter = styled.div`
    & svg {
        font-size: 30px;
    }
`;


export default Detail;