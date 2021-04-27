import React, { useEffect, useState } from 'react';
import {
	CommentInput,
	EventComment,
	GetCommentsResponse,
} from '../../pages/api/comments/[eventId]';
import CommentList from './comment-list';
import classes from './comments.module.css';
import NewComment from './new-comment';

export interface CommentsProps {
	eventId: string;
}

export const Comments: React.FC<CommentsProps> = ({ eventId }) => {
	const [showComments, setShowComments] = useState<boolean>(false);
	const [comments, setComments] = useState<EventComment[]>([]);
	const [refetch, setRefetch] = useState<boolean>(false);

	useEffect(() => {
		if (showComments) {
			fetch(`/api/comments/${eventId}`)
				.then(response => response.json())
				.then((data: GetCommentsResponse) => {
					setComments(data.comments);
					setRefetch(false);
				});
		}
	}, [showComments, refetch]);

	function toggleCommentsHandler() {
		setShowComments(prevStatus => !prevStatus);
	}

	function addCommentHandler(commentData: CommentInput) {
		fetch(`/api/comments/${eventId}`, {
			method: 'POST',
			body: JSON.stringify(commentData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.then(() => setRefetch(true));
	}

	return (
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && <CommentList items={comments} />}
		</section>
	);
};

export default Comments;
