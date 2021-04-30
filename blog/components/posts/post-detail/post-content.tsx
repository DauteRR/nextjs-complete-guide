import React from 'react';
import { Post } from '../../../types';
import PostHeader from './post-header';
import ReactMarkdown from 'react-markdown';

import classes from './post-content.module.css';

export interface PostContentProps extends Post {}

export const PostContent: React.FC<PostContentProps> = ({ title, image, slug, content }) => {
	const imagePath = `/images/posts/${slug}/${image}`;

	return (
		<article className={classes.content}>
			<PostHeader title={title} imagePath={imagePath} />
			<ReactMarkdown>{content}</ReactMarkdown>
		</article>
	);
};

export default PostContent;
