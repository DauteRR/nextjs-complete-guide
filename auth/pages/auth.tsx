import { NextPage } from 'next';
import React from 'react';
import { AuthForm } from '../components/auth/auth-form';

export interface AuthPageProps {}

const AuthPage: NextPage<AuthPageProps> = ({}) => {
	return <AuthForm />;
};

export default AuthPage;
