import React from 'react';
import { Post } from '../../types';
import PostsGrid from '../posts/posts-grid';
import classes from './featured-posts.module.css';

export interface FeaturedPostsProps {
	posts: Post[];
}

export const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
	return (
		<section className={classes.latest}>
			<h2>Featured Posts</h2>
			<PostsGrid posts={posts} />
		</section>
	);
};

export default FeaturedPosts;
