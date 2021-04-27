import { useRef, useState } from 'react';
import classes from './new-comment.module.css';

import React from 'react';
import { CommentInput } from '../../pages/api/comments/[eventId]';

export interface NewCommentProps {
	onAddComment(params: CommentInput): void;
}

export const NewComment: React.FC<NewCommentProps> = ({ onAddComment }) => {
	const [isInvalid, setIsInvalid] = useState<boolean>(false);

	const emailInputRef = useRef<HTMLInputElement>();
	const nameInputRef = useRef<HTMLInputElement>();
	const commentInputRef = useRef<HTMLTextAreaElement>();

	function sendCommentHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredName = nameInputRef.current.value;
		const enteredComment = commentInputRef.current.value;

		if (
			!enteredEmail ||
			enteredEmail.trim() === '' ||
			!enteredEmail.includes('@') ||
			!enteredName ||
			enteredName.trim() === '' ||
			!enteredComment ||
			enteredComment.trim() === ''
		) {
			setIsInvalid(true);
			return;
		}

		onAddComment({
			email: enteredEmail,
			name: enteredName,
			content: enteredComment,
		});
	}

	return (
		<form className={classes.form} onSubmit={sendCommentHandler}>
			<div className={classes.row}>
				<div className={classes.control}>
					<label htmlFor="email">Your email</label>
					<input type="email" id="email" ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor="name">Your name</label>
					<input type="text" id="name" ref={nameInputRef} />
				</div>
			</div>
			<div className={classes.control}>
				<label htmlFor="comment">Your comment</label>
				<textarea id="comment" rows={5} ref={commentInputRef}></textarea>
			</div>
			{isInvalid && <p>Please enter a valid email address and comment!</p>}
			<button>Submit</button>
		</form>
	);
};

export default NewComment;
