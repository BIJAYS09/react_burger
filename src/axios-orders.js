import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-c7e2c.firebaseio.com/'
});

export default instance;