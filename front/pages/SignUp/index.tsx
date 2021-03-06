import useInput from '@hooks/useInput';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { fetcher } from '@utils/fetcher';
import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, Navigate } from 'react-router-dom';
import { Form, Label, Input, LinkContainer, Button, Header, Error, Success } from './styles';

const SignUp = () => {
  const {data} = useQuery('user', () => fetcher('http://localhost:3095/api/users'));
  const [email, setEmail, onChangeEmail] = useInput('');
  const [nickname, setNickname, onChangeNickname] = useInput('');
  const [password, setPassword, _1] = useInput('');
  const [passwordCheck, setPasswordCheck, _2] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState('');

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMismatchError(e.target.value !== passwordCheck);
    setPassword(e.target.value)
  }, [passwordCheck]);
  const onChangePasswordCheck= useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMismatchError(e.target.value !== password);
    setPasswordCheck(e.target.value)
  }, [password]);
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!mismatchError && nickname) {
      console.log('서버로 회원가입하기기');
      setSignUpError('');
      setSignUpSuccess('');
      axios.post('http://localhost:3095/api/users', {
        email, nickname, password
      })
      .then((response: AxiosResponse<any> ) => {
        console.log(response);
        setSignUpSuccess(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
        setSignUpError(error.response?.data as string);
      }) 
    }; 
  }, [email, nickname, password, passwordCheck]);
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
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;