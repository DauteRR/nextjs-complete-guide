import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '../types';

const postsDirectory = path.join(process.cwd(), 'posts');

function getPostData(fileName: string): Post {
	const filePath = path.join(postsDirectory, fileName);
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(fileContent);

	const slug = fileName.replace(/\.md/, '');

	return {
		content,
		date: data.date ?? '',
		description: data.description ?? '',
		image: data.image ?? '',
		isFeatured: data.isFeatured ?? false,
		slug,
		title: data.title ?? '',
	};
}

export function getAllPosts(): Post[] {
	const postFiles = fs.readdirSync(postsDirectory);
	const posts = postFiles.map(getPostData);

	return posts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
}

export function getFeaturedPosts(): Post[] {
	return getAllPosts().filter(post => post.isFeatured);
}
