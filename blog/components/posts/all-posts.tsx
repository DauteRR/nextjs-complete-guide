import React from 'react';
import { Post } from '../../types';

import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';

export interface AllPostsProps {
	posts: Post[];
}

export const AllPosts: React.FC<AllPostsProps> = ({ posts }) => {
	return (
		<section className={classes.posts}>
			<h1>All Posts</h1>
			<PostsGrid posts={posts} />
		</section>
	);
};

export default AllPosts;
