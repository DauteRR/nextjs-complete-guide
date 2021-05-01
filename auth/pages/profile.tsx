import { NextPage } from 'next';
import React from 'react';
import { UserProfile } from '../components/profile/user-profile';

export interface ProfilePageProps {}

const ProfilePage: NextPage<ProfilePageProps> = ({}) => {
	return <UserProfile />;
};

export default ProfilePage;
