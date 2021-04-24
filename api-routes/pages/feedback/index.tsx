import { GetStaticProps, NextPage } from 'next';
import React, { useState } from 'react';
import { buildFeedbackPath, extractData, Feedback } from '../api/feedback';

export interface FeedbackPageProps {
	feedbackItems: Feedback[];
}

const FeedbackPage: NextPage<FeedbackPageProps> = ({ feedbackItems }) => {
	const [feedbackData, setFeedbackData] = useState<Feedback>();

	function loadFeedbackHandler(timestamp: number) {
		fetch(`/api/feedback/${timestamp}`)
			.then(response => response.json())
			.then((data: { feedback: Feedback }) => setFeedbackData(data.feedback));
	}

	return (
		<>
			{feedbackData && <p>{feedbackData.email}</p>}
			<ul>
				{feedbackItems.map((item, index) => (
					<li key={index}>
						{item.feedback}{' '}
						<button onClick={() => loadFeedbackHandler(item.timestamp)}>Show Details</button>
					</li>
				))}
			</ul>
		</>
	);
};

export const getStaticProps: GetStaticProps<FeedbackPageProps> = async () => {
	const filePath = buildFeedbackPath();
	const feedbackItems = extractData(filePath);

	return {
		props: {
			feedbackItems,
		},
	};
};

export default FeedbackPage;
