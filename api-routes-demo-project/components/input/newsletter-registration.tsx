import classes from './newsletter-registration.module.css';

import React, { useRef } from 'react';

export interface NewsletterRegistrationProps {}

export const NewsletterRegistration: React.FC<NewsletterRegistrationProps> = ({}) => {
	const emailInputRef = useRef<HTMLInputElement>();

	const registrationHandler: React.FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault();

		fetch('/api/newsletter', {
			method: 'POST',
			body: JSON.stringify({ email: emailInputRef.current.value }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then(console.log);
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
