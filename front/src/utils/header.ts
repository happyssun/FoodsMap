import axiosInstance from '../api/axios';

// key값에 토큰을 저장
function setHeader(key: string, value: string) {
  axiosInstance.defaults.headers.common[key] = value;
}

// 키값이 없으면 그냥 리턴하고 값이 있으면 지우라는 것
function removeHeader(key: string) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
}

export {setHeader, removeHeader};

// 로그인이 된 상태에서 해야하는것들이 많아 이런 경우 header에  accessToken이 있어야만 한다
// 그때마다 매번 토큰을 요청하지 말고 기본으로 이렇게 만들어 놓음

// defaults.headers.common으로해서 [key]에 토큰을 넣음
