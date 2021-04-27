import classes from './comment-list.module.css';

import React from 'react';
import { EventComment } from '../../pages/api/comments/[eventId]';

export interface CommentListProps {
	items: EventComment[];
}

export const CommentList: React.FC<CommentListProps> = ({ items }) => {
	return (
		<ul className={classes.comments}>
			{items.map((item, index) => (
				<li key={index}>
					<p>{item.content}</p>
					<div>
						By <address>{item.name}</address>
					</div>
				</li>
			))}
		</ul>
	);
};

export default CommentList;
