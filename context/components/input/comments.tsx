import React, { useEffect, useState } from 'react';
import {
	CommentInput,
	CreateCommentResponse,
	EventComment,
	GetCommentsResponse,
} from '../../pages/api/comments/[eventId]';
import { useNotification } from '../../store/notification-context';
import CommentList from './comment-list';
import classes from './comments.module.css';
import NewComment from './new-comment';

export interface CommentsProps {
	eventId: string;
}

export const Comments: React.FC<CommentsProps> = ({ eventId }) => {
	const [showComments, setShowComments] = useState<boolean>(false);
	const [comments, setComments] = useState<EventComment[]>([]);

	const { showNotification } = useNotification();

	const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);

	useEffect(() => {
		if (showComments) {
			setIsLoadingComments(true);

			fetch(`/api/comments/${eventId}`)
				.then(response => response.json())
				.then((data: GetCommentsResponse) => {
					setComments(data.comments);
					setIsLoadingComments(false);
				});
		}
	}, [showComments]);

	function toggleCommentsHandler() {
		setShowComments(prevStatus => !prevStatus);
	}

	function addCommentHandler(commentData: CommentInput) {
		showNotification({
			title: 'Creating comment...',
			message: 'Sending comment data',
			status: 'pending',
		});

		fetch(`/api/comments/${eventId}`, {
			method: 'POST',
			body: JSON.stringify(commentData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (response.ok) return response.json();

				response.json().then((response: CreateCommentResponse) => {
					showNotification({
						title: 'An error occurred',
						message: response.message ?? 'Something went wrong!',
						status: 'error',
					});
				});
			})
			.then((response: CreateCommentResponse) => {
				if (response.newComment) setComments([...comments, response.newComment]);
				showNotification({
					title: 'Success!',
					message: 'Comment created',
					status: 'success',
				});
			});
	}

	return (
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && !isLoadingComments && <CommentList items={comments} />}
			{showComments && isLoadingComments && <p>Loading ...</p>}
		</section>
	);
};

export default Comments;
