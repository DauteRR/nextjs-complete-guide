import React, { useState } from 'react';
import CommentList from './comment-list';
import classes from './comments.module.css';
import NewComment from './new-comment';

export interface CommentsProps {
	eventId: string;
}

export const Comments: React.FC<CommentsProps> = ({ eventId }) => {
	const [showComments, setShowComments] = useState<boolean>(false);

	function toggleCommentsHandler() {
		setShowComments(prevStatus => !prevStatus);
	}

	function addCommentHandler(commentData) {
		// send data to API
	}

	return (
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && <CommentList />}
		</section>
	);
};

export default Comments;
