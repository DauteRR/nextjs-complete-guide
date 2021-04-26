import classes from './comment-list.module.css';

import React from 'react';

export interface CommentListProps {}

export const CommentList: React.FC<CommentListProps> = ({}) => {
	return (
		<ul className={classes.comments}>
			{/* Render list of comments - fetched from API */}
			<li>
				<p>My comment is amazing!</p>
				<div>
					By <address>Maximilian</address>
				</div>
			</li>
			<li>
				<p>My comment is amazing!</p>
				<div>
					By <address>Maximilian</address>
				</div>
			</li>
		</ul>
	);
};

export default CommentList;
