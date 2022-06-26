import axios, { AxiosError } from 'axios';
import { fetcher } from '@utils/fetcher';
import React, { FC, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Navigate } from 'react-router-dom';
// import { IUser } from '@typings/db';

const Workspace: FC<React.PropsWithChildren<{}>> = ({children}) => {
  const queryClient = useQueryClient();
  const {data} = useQuery('user', () => fetcher('http://localhost:3095/api/users'));
  // const mutation = useMutation<IUser, AxiosError, null>('user', () => axios.post('http://localhost:3095/api/users/logout', null, {withCredentials: true})
  //   .then(res => res.data),
  //   {
  //     onSuccess() {
  //       queryClient.refetchQueries('user');
  //     },
  //     onError(error) {
  //       console.log(error.response?.data)
  //     }
  //   }
  // )
  const onLogout = useCallback(() => {
    axios.post('http://localhost:3095/api/users/logout', null, {withCredentials: true})
    .then(() => queryClient.setQueryData('user', null));
    // mutation.mutate(null);
  },[queryClient]);
  if(!data) return <Navigate replace to='/login'/>
  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;