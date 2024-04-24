import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;

// 리액트쿼리는 요청이 실패하면 기본적으로 3번 재요청을 하는데 이것을 방지하려고 retry:false 를 해줌
