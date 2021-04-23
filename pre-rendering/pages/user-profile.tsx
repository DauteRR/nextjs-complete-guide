import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

export interface UserProfilePageProps {
	username: string;
}

const UserProfilePage: NextPage<UserProfilePageProps> = ({ username }) => {
	return <h1>{username}</h1>;
};

export const getServerSideProps: GetServerSideProps<UserProfilePageProps> = async ({}) => {
	return {
		props: {
			username: 'Daute',
		},
	};
};

export default UserProfilePage;
