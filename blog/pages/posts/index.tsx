import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { AllPosts } from '../../components/posts/all-posts';
import { Post } from '../../types';
import { getAllPosts } from '../../utils/posts';

export interface AllPostsPageProps {
	posts: Post[];
}

const AllPostsPage: NextPage<AllPostsPageProps> = ({ posts }) => {
	return (
		<>
			<Head>
				<title>All Posts</title>
				<meta name="description" content="A list of all programming-related tutorials and posts!" />
			</Head>
			<AllPosts posts={posts} />
		</>
	);
};

export const getStaticProps: GetStaticProps<AllPostsPageProps> = async () => {
	const posts = getAllPosts();

	return {
		props: {
			posts,
		},
	};
};

export default AllPostsPage;
