import axios from 'axios';

export const axiosClient =  axios.create({
    baseURL:'http://192.168.126.2:5000/',
    timeout:8000,
    "Content-Type": "application/x-www-form-urlencoded",
})