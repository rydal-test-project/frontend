import axios from 'axios'

const inst = axios.create({
  baseURL: '/api'
});

inst.interceptors.request.use(config => {
  return {
    ...config,
    headers: {...config.headers, 'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
  }
});

export default inst