import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '../types';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostData(postId: string): Post | undefined {
	const postSlug = postId.replace(/\.md/, '');
	const filePath = path.join(postsDirectory, `${postSlug}.md`);

	try {
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const { data, content } = matter(fileContent);

		return {
			content,
			date: data.date ?? '',
			description: data.description ?? '',
			image: data.image ?? '',
			isFeatured: data.isFeatured ?? false,
			slug: postSlug,
			title: data.title ?? '',
		};
	} catch (err) {
		return undefined;
	}
}

export function getPostsFiles(): string[] {
	return fs.readdirSync(postsDirectory);
}

export function getAllPosts(): Post[] {
	const posts = getPostsFiles().map(getPostData);

	return posts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
}

export function getFeaturedPosts(): Post[] {
	return getAllPosts().filter(post => post.isFeatured);
}
