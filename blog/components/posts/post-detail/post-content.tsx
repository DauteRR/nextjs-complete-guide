import React from 'react';
import { Post } from '../../../types';
import Image from 'next/image';
import PostHeader from './post-header';
import ReactMarkdown, { ReactMarkdownOptions } from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import classes from './post-content.module.css';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

export interface PostContentProps extends Post {}

export const PostContent: React.FC<PostContentProps> = ({ title, image, slug, content }) => {
	const imagePath = `/images/posts/${slug}/${image}`;

	const customComponents: ReactMarkdownOptions['components'] = {
		p(paragraph) {
			const { node } = paragraph;

			if (node.children[0].tagName === 'img') {
				const image = (node.children[0] as unknown) as { properties: { src: string }; alt: string };

				return (
					<div className={classes.image}>
						<Image
							src={`/images/posts/${slug}/${image.properties.src}`}
							alt={image.alt}
							width={600}
							height={300}
						/>
					</div>
				);
			}

			return <p>{paragraph.children}</p>;
		},
		code(code) {
			const { className, children } = code;
			const language = (className as string).split('-')[1];
			return <SyntaxHighlighter style={atomDark} language={language} children={children} />;
		},
	};

	return (
		<article className={classes.content}>
			<PostHeader title={title} imagePath={imagePath} />
			<ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
		</article>
	);
};

export default PostContent;
