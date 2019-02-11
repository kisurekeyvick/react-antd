import { getPost } from '../service/post-api';

export const loadPostAction = async (dispatch: any) => {
    const res = await getPost();
    
    dispatch({
        type: 'LOAD_POSTS',
        payload: res.data
    });
}
