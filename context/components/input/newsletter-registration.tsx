import classes from './newsletter-registration.module.css';

import React, { useRef } from 'react';
import { useNotification } from '../../store/notification-context';
import { NewsletterSubscriptionResponse } from '../../pages/api/newsletter';

export interface NewsletterRegistrationProps {}

export const NewsletterRegistration: React.FC<NewsletterRegistrationProps> = ({}) => {
	const emailInputRef = useRef<HTMLInputElement>();
	const { showNotification } = useNotification();

	const registrationHandler: React.FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault();

		showNotification({
			title: 'Signing up...',
			message: 'Registering for newsletter',
			status: 'pending',
		});

		fetch('/api/newsletter', {
			method: 'POST',
			body: JSON.stringify({ email: emailInputRef.current.value }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (response.ok) return response.json();

				response.json().then((response: NewsletterSubscriptionResponse) => {
					showNotification({
						title: 'An error occurred',
						message: response.message,
						status: 'error',
					});
				});
			})
			.then(() => {
				showNotification({
					title: 'Success!',
					message: 'Successfully registered for newsletter',
					status: 'success',
				});
			});
	};

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						type="email"
						id="email"
						placeholder="Your email"
						aria-label="Your email"
						ref={emailInputRef}
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
};

export default NewsletterRegistration;
