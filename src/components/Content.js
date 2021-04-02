import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Permit from '../shared/Permit';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import ChatIcon from '@material-ui/icons/Chat';
import DeleteIcon from '@material-ui/icons/Delete';
import { ImageBox } from '../elements/index';
import { removePostFB, likePostFB } from '../redux/modules/post';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { apiKey } from '../shared/firebase';

const Content = (props) => {
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false;

    const dispatch = useDispatch(); 
    const likes_user = useSelector((state) => state.post.list);
    const login_info = useSelector((state) => state.user.user);

    const post_id = props.id;
    const user_id = login_info?.uid;

    let is_like = false;

    if(is_session){
      const user = likes_user.filter((val) => val.id === post_id);

      user.map((val) => {
        if(val.likes_user.length > 0){
          val.likes_user.map((val) => {
            if(val === user_id){
              is_like = true;
            }
          });
        }
      });
    }

    const [like, setLike] = useState(is_like);
  
    const Likes = () => {
        if(is_session){
          if(like){
            dispatch(likePostFB(post_id, user_id, true));
          } else {
            dispatch(likePostFB(post_id, user_id, false));
          }
  
          setLike(!like);
        } else {
          history.push('/login');
        }
    };

    useEffect(() => {
      if(!is_session){
        setLike(false);
      }
    }, [is_session]);

    const Edit = () => {
      history.push(`/edit/${props.id}`);
    };

    const Remove = () => {
      dispatch(removePostFB(post_id));
      history.replace('/');
    };

    const Detail = () => {
      history.push(`/detail/${props.id}`);
    };

    if(props.layout === 'top') {
        return (
          <>
            <ContentContainer>
              <ProfileContainer>
                <div>
                  <ImageBox shape="circle" src={props.user_info.user_profile} />
                  <b>{props.user_info.nickname}</b>
                </div>
                <ContentInfo>
                  <span>{props.insert_dt}</span>
                  <Permit>
                    {props.is_me && (
                      <>
                      <EditIcon
                        style={{ color: "#4e8d7c", cursor: "pointer" }} onClick={Edit}
                      />
                      <DeleteIcon style={{ color: "#4e8d7c", cursor: "pointer", margin: "0 0 0 4px" }} onClick={Remove} />
                      </>
                    )}
                  </Permit>
                </ContentInfo>
              </ProfileContainer>
              <LayoutTop>
                <LayoutContentTop>
                  <span>{props.contents}</span>
                </LayoutContentTop>
                <LayoutImageTop>
                  <ImageBox width="100%" height="350px" src={props.image_url} _onClick={Detail} />
                </LayoutImageTop>
              </LayoutTop>
              <LikeContainer>
                <span>좋아요 {props.likes}개</span>
                <IconConainter>
                    {like ? (<FavoriteIcon
                    style={{
                      color: "#ff005c",
                      cursor: "pointer",
                      margin: "0 8px 0 0",
                    }}
                    onClick={Likes}
                  />) : (<FavoriteBorderIcon
                    style={{
                      color: "#ff005c",
                      cursor: "pointer",
                      margin: "0 8px 0 0",
                    }}
                    onClick={Likes}
                  />)}
                  <ChatIcon style={{ color: "#4e8d7c", cursor: "pointer" }} />
                </IconConainter>
              </LikeContainer>
            </ContentContainer>
          </>
        );
    } else if(props.layout === 'left') {
        return (
          <>
            <ContentContainer>
              <ProfileContainer>
                <div>
                  <ImageBox shape="circle" src={props.user_info.user_profile} />
                  <b>{props.user_info.nickname}</b>
                </div>
                <ContentInfo>
                  <span>{props.insert_dt}</span>
                  <Permit>
                  {props.is_me && (
                      <>
                      <EditIcon
                        style={{ color: "#4e8d7c", cursor: "pointer" }} onClick={Edit}
                      />
                      <DeleteIcon style={{ color: "#4e8d7c", cursor: "pointer", margin: "0 0 0 4px" }} onClick={Remove} />
                      </>
                    )}
                  </Permit>
                </ContentInfo>
              </ProfileContainer>
              <LayoutLeft>
                <LayoutContentSide>
                  <span>{props.contents}</span>
                </LayoutContentSide>
                <LayoutImageSide>
                  <ImageBox width="100%" height="350px" src={props.image_url} _onClick={Detail} />
                </LayoutImageSide>
              </LayoutLeft>
              <LikeContainer>
                <span>좋아요 {props.likes}개</span>
                <IconConainter>
                {like ? (<FavoriteIcon
                    style={{
                      color: "#ff005c",
                      cursor: "pointer",
                      margin: "0 8px 0 0",
                    }}
                    onClick={Likes}
                  />) : (<FavoriteBorderIcon
                    style={{
                      color: "#ff005c",
                      cursor: "pointer",
                      margin: "0 8px 0 0",
                    }}
                    onClick={Likes}
                  />)}
                  <ChatIcon style={{ color: "#4e8d7c", cursor: "pointer" }} />
                </IconConainter>
              </LikeContainer>
            </ContentContainer>
          </>
        );
    }
    // Layout -> right
    return (
      <>
        <ContentContainer>
          <ProfileContainer>
            <div>
              <ImageBox shape="circle" src={props.user_info.user_profile} />
              <b>{props.user_info.nickname}</b>
            </div>
            <ContentInfo>
              <span>{props.insert_dt}</span>
              <Permit>
                {props.is_me && (
                  <>
                    <EditIcon
                      style={{ color: "#4e8d7c", cursor: "pointer" }}
                      onClick={Edit}
                    />
                    <DeleteIcon
                      style={{
                        color: "#4e8d7c",
                        cursor: "pointer",
                        margin: "0 0 0 4px",
                      }}
                      onClick={Remove}
                    />
                  </>
                )}
              </Permit>
            </ContentInfo>
          </ProfileContainer>
          <LayoutRight>
            <LayoutContentSide>
              <span>{props.contents}</span>
            </LayoutContentSide>
            <LayoutImageSide>
              <ImageBox width="100%" height="350px" src={props.image_url} _onClick={Detail} />
            </LayoutImageSide>
          </LayoutRight>
          <LikeContainer>
            <span>좋아요 {props.likes}개</span>
            <IconConainter>
              {like ? (
                <FavoriteIcon
                  style={{
                    color: "#ff005c",
                    cursor: "pointer",
                    margin: "0 8px 0 0",
                  }}
                  onClick={Likes}
                />
              ) : (
                <FavoriteBorderIcon
                  style={{
                    color: "#ff005c",
                    cursor: "pointer",
                    margin: "0 8px 0 0",
                  }}
                  onClick={Likes}
                />
              )}
              <ChatIcon style={{ color: "#4e8d7c", cursor: "pointer" }} />
            </IconConainter>
          </LikeContainer>
        </ContentContainer>
      </>
    );
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

export default Content;