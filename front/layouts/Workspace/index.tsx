import axios, { AxiosError } from 'axios';
import { fetcher } from '@utils/fetcher';
import React, { FC, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import gravatar from 'gravatar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from './styles';
import { IUser } from '@typings/db';
import loadable from '@loadable/component';
const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace = () => {
  const queryClient = useQueryClient();
  const {data} = useQuery<IUser>('user', () => fetcher('http://localhost:3095/api/users'));
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
  console.log(data);
  if(!data) return <Navigate replace to='/login'/>
  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg src={gravatar.url(data.email, {s: '28px', d: 'retro'})} alt={data.nickname}/>
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>
            MenuScroll
          </MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path='/channel' element={<Channel/>}/>
            <Route path='/dm' element={<DirectMessage/>}/>
          </Routes>
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;