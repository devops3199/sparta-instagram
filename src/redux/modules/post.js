import { firestore, storage } from '../../shared/firebase';
import moment from 'moment';
import { setPreview } from './image';
import firebase from 'firebase/app';

const SET_POST = 'post/SET_POST';
const ADD_POST = 'post/ADD_POST';
const EDIT_POST = 'post/EDIT_POST';
const LIKE_POST = 'post/LIKE_POST';
const REMOVE_POST = 'post/REMOVE_POST';
const LOADING = 'post/LOADING';

const postDB = firestore.collection('post');

export const setPost = (post_list, paging) => {
    return { type: SET_POST, post_list, paging };
};

export const addPost = (post) => {
    return { type: ADD_POST, post };
};

export const editPost = (post_id ,post) => {
    return { type: EDIT_POST, post_id, post };
};

export const likePost = (post_id) => {
    return { type: LIKE_POST, post_id };
};

export const removePost = (post_id) => {
    return { type: REMOVE_POST, post_id };
};

export const loading = (is_loading) => {
    return { type: LOADING, is_loading };
};

const initialState = {
    list: [],
    paging: {start: null, next: null, size: 3},
    is_loading: false,
};

const initialPost = {
    image_url: 'https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg',
    contents: '',
    likes: 0,
    layout: 'top',
    insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
};

export const getOnePostFB = (id) => {
    return function(dispatch, getState, {history}){
        
        postDB.doc(id).get().then(doc => {
            let temp = doc.data();
            let post = Object.keys(temp).reduce((acc, cur) => {

                if(cur.indexOf('user_') !== -1 || cur.indexOf('nickname') !== -1){
                    return {...acc, user_info: {...acc.user_info, [cur]: temp[cur]}}
                }

                return {...acc, [cur] : temp[cur]}
            }, {id: doc.id, user_info: {}});

            dispatch(setPost([post]));
        }).catch(err => {
            console.log(err);
        })

    }
}

export const likePostFB = (post_id, user_id, is_like) => {
    return function(dispatch, getState, {history}){
        const increment = is_like ? firebase.firestore.FieldValue.increment(-1) : firebase.firestore.FieldValue.increment(1);
        const users = is_like ? firebase.firestore.FieldValue.arrayRemove(user_id) : firebase.firestore.FieldValue.arrayUnion(user_id);
        const post = getState().post.list.find((val) => val.id === post_id);

        postDB.doc(post_id).update({likes: increment, likes_user: users}).then((docs) => {

            let ret = is_like ? post.likes_user.filter(item => item !== user_id) : post.likes_user.concat([user_id]);

            dispatch(editPost(post_id, {
                likes: is_like ? parseInt(post.likes) - 1 : parseInt(post.likes) + 1,
                likes_user: ret,
            }));
            history.replace('/');
        }).catch((err) => console.log(err));
    }
};

export const removePostFB = (post_id) => {
    return function(dispatch, getState, {history}){
        postDB.doc(post_id).delete().then((docs) => {
            dispatch(removePost(post_id));
        }).catch((err) => console.log(err));
    };
};

export const editPostFB = (post_id = null, post = {}) => {
    return function(dispatch, getState, {history}){

        if(!post_id){
            return;
        }

        const _image = getState().image.preview;
        const _post_index = getState().post.list.findIndex(p => p.id === post_id);
        const _post = getState().post.list[_post_index];

        if(_image === _post.image_url) {
            postDB.doc(post_id).update(post).then(doc => {
                dispatch(editPost(post_id, {...post}));
                history.replace('/');
            })
        } else {

            const user_id = getState().user.user.uid;

            const _upload = storage.ref(`images/${user_id}_${new Date().getTime()}`).putString(_image, 'data_url');

            _upload.then((val) => {
                val.ref.getDownloadURL().then(url => {
                    return url;
                }).then(url => {
                    postDB.doc(post_id).update({...post, image_url: url}).then(doc => {
                        dispatch(editPost(post_id, {...post, image_url: url}));
                        history.replace('/');
                    }).catch((err) => {
                        console.log(err, 'err');
                    });
                }).catch((err) => {
                    console.log(err, 'err2');
                });
            });
        }
    };
};

export const addPostFB = (contents='', layout='top') => {
    return function(dispatch, getState, {history}){
        const _user = getState().user.user;

        const user_info = {
            nickname : _user.nickname,
            user_id : _user.uid,
            user_profile: _user.user_profile,
        };

        const _post = {
            ...initialPost,
            contents: contents,
            layout: layout,
            likes_user: [],
            insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
        };

        const _image = getState().image.preview;

        const _upload = storage.ref(`images/${user_info.user_id}_${new Date().getTime()}`).putString(_image, 'data_url');

        _upload.then((val) => {
            val.ref.getDownloadURL().then(url => {
                return url;
            }).then(url => {
                postDB.add({ ...user_info, ..._post, image_url: url, }).then((doc) => {
                    let post = { user_info, ..._post, id: doc.id, image_url: url, likes_user: [], };
                    dispatch(addPost(post));
                    history.replace('/');
                    dispatch(setPreview(null));
                }).catch((err) => {
                    console.log(err, 'err');
                });
            }).catch((err) => {
                console.log(err, 'err2');
            });
        });
    };
};

export const getPostFB = (start = null, size = 3) => {
    return function(dispatch, getState, {history}){

        // state에서 페이징 정보 가져오기
        let _paging = getState().post.paging;

        // 시작정보가 기록되었는데 다음 가져올 데이터가 없다면? 앗, 리스트가 끝났겠네요!
        // 그럼 아무것도 하지말고 return을 해야죠!
        if (_paging.start && !_paging.next) {
            return;
        }

        dispatch(loading(true));

        let query = postDB.orderBy('insert_dt', 'desc');

        if(start){
            query = query.startAt(start);
        }

        query.limit(size + 1).get().then((docs) => {

            let post_list = [];

            let paging = {
                start: docs.docs[0],
                next: docs.docs.length === size + 1 ? docs.docs[docs.docs.length-1] : null,
                size: size,
            };

            docs.forEach((doc) => {
                let temp = doc.data();

                let post = Object.keys(temp).reduce((acc, cur) => {

                    if(cur.indexOf('user_') !== -1 || cur.indexOf('nickname') !== -1){
                        return {...acc, user_info: {...acc.user_info, [cur]: temp[cur]}}
                    }

                    return {...acc, [cur] : temp[cur]}
                }, {id: doc.id, user_info: {}});

                post_list.push(post);
            })

            post_list.pop();
            dispatch(setPost(post_list, paging));
        });
    }
};

//reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'post/SET_POST':
            state.list.push(...action.post_list);

            state.list = state.list.reduce((acc, cur) => {
                if(acc.findIndex(a => a.id === cur.id) === -1){
                    return [...acc, cur];
                } else {
                    acc[acc.findIndex(a => a.id === cur.id)] = cur;
                    return acc;
                }
            }, []);

            console.log(state.list, 'dsadsa');

            if(action.paging){
                state.paging = action.paging;
            }

            state.is_loading = false;

            return state;
        case 'post/LOADING':
            state.is_loading = action.is_loading;
            return state;
        case 'post/ADD_POST':
            state.list.unshift(action.post);
            return state;
        case 'post/EDIT_POST':
            let index = state.list.findIndex((val) => val.id === action.post_id);
            state.list[index] = {...state.list[index], ...action.post};
            return state;
        case 'post/REMOVE_POST':
            let idx = state.list.findIndex((val) => val.id === action.post_id);
            state.list.pop(idx);
            return state;
        case 'post/LIKE_POST':
    
            return state;
        default:
            return state;
    }
};