import axios from 'axios';

export const getPost = () => {
    return axios.get('http://jsonplaceholder.typicode.com/posts');
};