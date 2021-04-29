import { NextPage } from 'next';
import React from 'react';
import { DUMMY_POSTS } from '..';
import AllPosts from '../../components/posts/all-posts';

export interface AllPostsPageProps {}

const AllPostsPage: NextPage<AllPostsPageProps> = ({}) => {
	return <AllPosts posts={DUMMY_POSTS} />;
};

export default AllPostsPage;
