import axios from 'axios'
import { get } from './get'
import { post } from './post'


const inst = axios.create({
  baseURL: '/api'
});

inst.interceptors.request.use(config => {
  return {
    ...config,
    headers: {...config.headers, 'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
  }
});

const api = {
  get,
  post
}


export {
  api,
  inst,
  get,
  post
}