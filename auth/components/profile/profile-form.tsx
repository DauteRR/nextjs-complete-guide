import React, { useRef } from 'react';
import classes from './profile-form.module.css';

async function changePassword(oldPassword: string, newPassword: string) {
	const response = await fetch('/api/user/change-password', {
		method: 'PATCH',
		body: JSON.stringify({ newPassword, oldPassword }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();

	console.log(data);
}

export interface ProfileFormProps {}

export const ProfileForm: React.FC<ProfileFormProps> = ({}) => {
	const newPasswordInputRef = useRef<HTMLInputElement>();
	const oldPasswordInputRef = useRef<HTMLInputElement>();

	const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault();

		const oldPassword = oldPasswordInputRef.current.value;
		const newPassword = newPasswordInputRef.current.value;

		changePassword(oldPassword, newPassword);
	};

	return (
		<form className={classes.form} onSubmit={handleFormSubmit}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input type="password" id="new-password" ref={newPasswordInputRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor="old-password">Old Password</label>
				<input type="password" id="old-password" ref={oldPasswordInputRef} />
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
