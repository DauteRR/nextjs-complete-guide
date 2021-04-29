import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../../types';

import classes from './post-item.module.css';

export interface PostItemProps extends Post {}

export const PostItem: React.FC<PostItemProps> = ({ date, description, image, slug, title }) => {
	const formattedDate = new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const link = `/posts/${slug}`;
	const imagePath = `/images/posts/${slug}/${image}`;

	return (
		<li className={classes.post}>
			<Link href={link}>
				<a>
					<div className={classes.image}>
						<Image src={imagePath} alt={title} width={300} height={200} layout="responsive" />
					</div>
					<div className={classes.content}>
						<h3>{title}</h3>
						<time>{formattedDate}</time>
						<p>{description}</p>
					</div>
				</a>
			</Link>
		</li>
	);
};

export default PostItem;
