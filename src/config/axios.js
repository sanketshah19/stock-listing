import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'data'
})

export default axios;