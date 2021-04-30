import { NextPage } from 'next';
import React from 'react';
import PostContent from '../../components/posts/post-detail/post-content';
import { Post } from '../../types';

export interface PostPageProps {
	post: Post;
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
	return <PostContent {...post} />;
};

export default PostPage;
