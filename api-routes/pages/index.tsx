import { NextPage } from 'next';
import { FormEventHandler, useRef, useState } from 'react';
import { Feedback, GetResponse } from './api/feedback';

const HomePage: NextPage = () => {
	const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([]);

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

	const loadFeedbackHandler = () => {
		fetch('/api/feedback')
			.then(response => response.json())
			.then((data: GetResponse) => setFeedbackItems(data.feedback));
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
			<hr />
			<button onClick={loadFeedbackHandler}>Load Feedback</button>
			<ul>
				{feedbackItems.map((item, index) => (
					<li key={index}>{item.feedback}</li>
				))}
			</ul>
		</div>
	);
};

export default HomePage;
