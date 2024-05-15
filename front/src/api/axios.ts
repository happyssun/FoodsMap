import axios from 'axios';
import {Platform} from 'react-native'; // import도 추가해주세요.

const axiosInstance = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3030'
      : 'http://localhost:3030',
  withCredentials: true,
});

export default axiosInstance;
