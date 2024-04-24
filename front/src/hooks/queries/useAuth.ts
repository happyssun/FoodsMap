import {useMutation, useQuery} from '@tanstack/react-query';
import {removeEncryptStorage, setEncryptStorage} from '../../utils';
import {removeHeader, setHeader} from '../../utils/header';
import {useEffect} from 'react';
import queryClient from '../../api/queryClient';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../../types/common';
import {getProfile, logout, postLogin, postSignup} from '../../api/auth';

// 옵션들을 다 하나씩 넣지않고 필요한것을 주입받아 사용할수 있게 옵션을 인자로 받는다
function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,

    // 로그인이 성공하였을때 처리할것
    onSuccess: ({accessToken, refreshToken}) => {
      // accessToken은 헤더에 저장
      // EncryptStorage에 refreshToken을 저장 (key, value)
      setEncryptStorage('refreshToken', refreshToken);
      setHeader('Authirization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({queryKey: ['auth', 'getAccessToken']});
      queryClient.invalidateQueries({queryKey: ['auth', 'getProfile']});
    },
    ...mutationOptions,
  });
}

// accessToken을 한번 받아와서 보안상 저장하지 않고 짧게만 사용한다 그래서 useQuery로 stale(신선하지않은)로 취급되는 시간을 지정 - 유효시간지정
function useGetRefreshToken() {
  const {isSuccess, data, isError} = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 3, // 30분
    refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3, // 갱신되게
    refetchOnReconnect: true, // 앱을 종료하지 않고 다른작업하다 들어와도 자동갱신되게
    refetchIntervalInBackground: true, // 다시 연결되거나 백그라운드에서 리페치되게
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authirization', `Bearer ${data.accessToken}`);
      setEncryptStorage('refreshToken', data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authirization');
      removeEncryptStorage('refreshToken');
    }
  }, [isError]);

  return {isSuccess, isError};
}

// 로그인 된 후 프로필 가져오기
function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: ['auth', 'getProfile'],
    queryFn: getProfile,
    ...queryOptions,
  });
}
function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authrization');
      removeEncryptStorage('refreshToken');
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['auth']});
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess, // enabled가 true일때 실행 : 리프레시토큰이 성공했을때 프로필을 가져옴
  });
  const isLogin = getProfileQuery.isSuccess; // 로그인이 되면 프로필을 가져옴
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
  };
}

export {useSignup, useLogin, useGetRefreshToken, useGetProfile, useLogout};

export default useAuth;

// 4버전에서는 useQuery(['auth','getAccessToken'], getAccessToken) 이런식으로
//                    쿼리키값  |  함수  \  옵션
