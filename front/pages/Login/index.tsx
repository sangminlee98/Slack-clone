import useInput from '@hooks/useInput';
import { Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import axios, { AxiosError } from 'axios';
import { fetcher } from '@utils/fetcher';
import React, { useCallback, useState } from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import { Link, Navigate } from 'react-router-dom';
import { IUser } from '@typings/db';

const LogIn = () => {
  const queryClient = useQueryClient();
  const {data, error, isLoading} = useQuery<IUser>('user',() => fetcher('http://localhost:3095/api/users'));
  const mutaion = useMutation<IUser, AxiosError<string>, {email: string, password: string}>('user', (data) => 
    axios.post('http://localhost:3095/api/users/login', data, {withCredentials: true})
    .then(res => res.data),
    {
      onMutate() {
        setLogInError(false);
      },
      onSuccess() {
        queryClient.refetchQueries('user');
      },
      onError(error) {
        setLogInError(error.response?.status === 401);
        setErrorMsg(error.response?.data || '');
      }
    }
  )
  const [logInError, setLogInError] = useState(false);
  const [email, setEmail, onChangeEmail] = useInput('');
  const [password, setPassword, onChangePassword] = useInput('');
  const [errorMsg, setErrorMsg] = useState('');
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutaion.mutate({email, password});
  }, [email, password, mutaion]);
  if(data) return <Navigate replace to='/workspace/channel'/>
  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>{errorMsg}</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;