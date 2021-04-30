import React, { useEffect, useState } from 'react';
import { ContactResponse, MessageInput } from '../../pages/api/contact';
import { Notification, NotificationProps, NotificationStatus } from '../ui/notification';

import classes from './contact-form.module.css';

async function sendMessage(message: MessageInput) {
	const response = await fetch('/api/contact', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	});

	const data = (await response.json()) as ContactResponse;
	if (!response.ok) {
		throw new Error(data.message ?? 'Something went wrong!');
	}
}

export interface ContactFormProps {}

export const ContactForm: React.FC<ContactFormProps> = ({}) => {
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [requestStatus, setRequestStatus] = useState<NotificationStatus>();
	const [errorMessage, setErrorMessage] = useState<string>('');

	useEffect(() => {
		if (requestStatus === 'success' || requestStatus === 'error') {
			const timer = setTimeout(() => {
				setRequestStatus(undefined);
				setErrorMessage('');
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [requestStatus]);

	const sendMessageHandler: React.FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();

		setRequestStatus('pending');

		try {
			await sendMessage({ email, name, content });
			setRequestStatus('success');
			setEmail('');
			setName('');
			setContent('');
		} catch (err) {
			setRequestStatus('error');
			setErrorMessage(err.message);
		}
	};

	let notification: NotificationProps | undefined = undefined;

	if (requestStatus === 'pending') {
		notification = {
			status: 'pending',
			message: 'Your message is on its way',
			title: 'Sending message...',
		};
	}

	if (requestStatus === 'success') {
		notification = {
			status: 'success',
			message: 'Message sent successfully',
			title: 'Success!',
		};
	}

	if (requestStatus === 'error') {
		notification = {
			status: 'error',
			message: errorMessage,
			title: 'Error!',
		};
	}

	return (
		<section className={classes.contact}>
			<h1>How can I help you?</h1>
			<form className={classes.form} onSubmit={sendMessageHandler}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor="email">Your Email</label>
						<input
							type="email"
							id="email"
							required
							value={email}
							onChange={event => setEmail(event.target.value)}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="name">Your Name</label>
						<input
							type="text"
							id="name"
							required
							value={name}
							onChange={event => setName(event.target.value)}
						/>
					</div>
				</div>
				<div className={classes.control}>
					<label htmlFor="content">Your Message</label>
					<textarea
						id="content"
						rows={5}
						required
						value={content}
						onChange={event => setContent(event.target.value)}
					/>
				</div>

				<div className={classes.actions}>
					<button>Send Message</button>
				</div>
			</form>
			{notification && <Notification {...notification} />}
		</section>
	);
};

export default ContactForm;
