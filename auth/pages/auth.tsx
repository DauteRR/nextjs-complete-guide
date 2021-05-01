import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { AuthForm } from '../components/auth/auth-form';
import { getSession } from 'next-auth/client';

export interface AuthPageProps {}

const AuthPage: NextPage<AuthPageProps> = ({}) => {
	return <AuthForm />;
};

export const getServerSideProps: GetServerSideProps<AuthPageProps> = async context => {
	const session = await getSession({ req: context.req });

	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default AuthPage;
