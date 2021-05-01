import React from 'react';
import { ProfileForm } from './profile-form';
import classes from './user-profile.module.css';

export interface UserProfileProps {}

export const UserProfile: React.FC<UserProfileProps> = ({}) => {
	return (
		<section className={classes.profile}>
			<h1>Your User Profile</h1>
			<ProfileForm />
		</section>
	);
};

export default UserProfile;
