import {
  UseMutationOptions,
  UseQueryOptions,
  QueryKey,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

type ResponseError = AxiosError<{
  statusCode: string;
  message: string;
  error: string;
}>;

// UseMutationOptions 파일을 보면 기본으로 정의되어있는것들 확인 가능, 보면 Error가 있는데 지금 axios를 사용함으로 서버에 메세지를 보이게 할것이라 type을 하나 만들어서 그걸 넣음
type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>;

export type {ResponseError, UseMutationCustomOptions, UseQueryCustomOptions};

/* omit 사용법
type에서 사용이 가능한 것으로 이미 지정한 타입에서 무언가를 빼고 싶을때 사용

type Menu = {
  name:string;
  price:null;
}

type MenuWithoutPrice = Omit<Menu, "price">
이렇게 하고 타입을 보면 위의 Menu에서 price만 빠진 타입으로 type MenuWithoutPrice가 정의된다
*/
