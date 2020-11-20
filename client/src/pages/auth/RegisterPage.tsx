import React from 'react';
import AuthTemplate from 'components/auth/AuthTemplate';
import RegisterContainer from 'containers/auth/RegisterContainer';

const RegisterPage = () => {
  return (
    <AuthTemplate mode="register">
      <RegisterContainer />
    </AuthTemplate>
  );
};

export default RegisterPage;
