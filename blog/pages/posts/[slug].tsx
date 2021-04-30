import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import PostContent from '../../components/posts/post-detail/post-content';
import { Post } from '../../types';
import { getPostData, getPostsFiles } from '../../utils/posts';

export interface PostPageParsedUrlQuery {
	[key: string]: string | string[];
	slug: string;
}

export interface PostPageProps {
	post: Post;
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name="description" content={post.description} />
			</Head>
			<PostContent {...post} />
		</>
	);
};

export const getStaticProps: GetStaticProps<PostPageProps, PostPageParsedUrlQuery> = async ({
	params,
}) => {
	const { slug } = params;

	const post = getPostData(slug);

	if (post === undefined) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			post,
		},
		revalidate: 600,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = getPostsFiles().map(fileName => fileName.replace(/\.md/, ''));

	return {
		fallback: false,
		paths: slugs.map(slug => ({
			params: {
				slug,
			},
		})),
	};
};

export default PostPage;
