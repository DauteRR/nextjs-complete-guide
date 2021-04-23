import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

export interface UserIdPageUrlParams {
	[key: string]: string | string[];
	uid: string;
}

export interface UserIdPagePageProps {
	uid: string;
}

const UserIdPagePage: NextPage<UserIdPagePageProps> = ({ uid }) => {
	return <h1>{uid}</h1>;
};

export const getServerSideProps: GetServerSideProps<
	UserIdPagePageProps,
	UserIdPageUrlParams
> = async ({ params }) => {
	const { uid } = params;

	return {
		props: {
			uid: 'userid-' + uid,
		},
	};
};

export default UserIdPagePage;
