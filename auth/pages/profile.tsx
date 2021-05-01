import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { UserProfile } from '../components/profile/user-profile';
import { getSession } from 'next-auth/client';

export interface ProfilePageProps {}

const ProfilePage: NextPage<ProfilePageProps> = ({}) => {
	return <UserProfile />;
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async context => {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default ProfilePage;
