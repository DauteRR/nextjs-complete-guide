import React from 'react';
import { Post } from '../../types';
import { PostItem } from './post-item';

import classes from './posts-grid.module.css';

export interface PostsGridProps {
	posts: Post[];
}

export const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
	return (
		<ul className={classes.grid}>
			{posts.map(post => (
				<PostItem key={post.slug} {...post} />
			))}
		</ul>
	);
};

export default PostsGrid;
