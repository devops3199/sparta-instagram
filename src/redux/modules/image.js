import { storage } from '../../shared/firebase';

// actions
const UPLOADING = 'image/UPLOADING';
const UPLOAD_IMAGE = 'image/UPLOAD_IMAGE';
const SET_PREVIEW = 'image/SET_PREVIEW';

export const uploading = (uploading) => {
    return { type: UPLOADING, uploading };
};

export const uploadImage = (image_url) => {
    return { type: UPLOAD_IMAGE, image_url };
};

export const setPreview = (preview) => {
    return { type: SET_PREVIEW, preview };
};

// initial state
const initialState = {
    image_url: "http://via.placeholder.com/400x300",
    uploading: false,
    preview: null,
};

export const uploadImageFB = (image) => {
    return function (dispatch, getState, {history}) {
    
        dispatch(uploading(true));
        
        console.log(`images/${new Date().getTime()}_${image.name}`);

        const _upload = storage.ref(`images/${image.name}`).put(image);
    
        //   업로드!
        _upload.then((snapshot) => {
          console.log(snapshot);
    
          // 업로드한 파일의 다운로드 경로를 가져오자!
          snapshot.ref.getDownloadURL().then((url) => {
            dispatch(uploadImage(url));
          });
        }).catch(err => {
            dispatch(uploading(false));
        });
    };
};

  //reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'image/UPLOADING':
            state.uploading = action.uploading;
            return state;
        case 'image/UPLOAD_IMAGE':
            state.image_url = action.image_url;
            state.uploading = false;
            return state;
        case 'image/SET_PREVIEW':
            state.preview = action.preview;
            return state;
        default:
            return state;
    }
};