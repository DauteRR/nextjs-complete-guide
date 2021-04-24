import { NextPage } from 'next';
import { FormEventHandler, useRef } from 'react';

const HomePage: NextPage = () => {
	const emailInputRef = useRef<HTMLInputElement>();
	const feedbackInputRef = useRef<HTMLTextAreaElement>();

	const submitFormHandler: FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault();

		const email = emailInputRef.current.value;
		const feedback = feedbackInputRef.current.value;

		fetch('/api/feedback', {
			method: 'POST',
			body: JSON.stringify({ email, feedback }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then(console.log);
	};

	return (
		<div>
			<h1>The Home Page</h1>
			<form onSubmit={submitFormHandler}>
				<div>
					<label htmlFor="email">Your Email address</label>
					<input type="email" id="email" ref={emailInputRef} />
				</div>
				<div>
					<label htmlFor="feedback">Your feedback</label>
					<textarea id="feedback" rows={5} ref={feedbackInputRef} />
				</div>
				<button>Send Feedback</button>
			</form>
		</div>
	);
};

export default HomePage;
