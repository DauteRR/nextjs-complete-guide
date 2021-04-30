import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import AllPosts from '../../components/posts/all-posts';
import { Post } from '../../types';
import { getAllPosts } from '../../utils/posts';

export interface AllPostsPageProps {
	posts: Post[];
}

const AllPostsPage: NextPage<AllPostsPageProps> = ({ posts }) => {
	return <AllPosts posts={posts} />;
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
