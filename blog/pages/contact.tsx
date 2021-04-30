import { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import ContactForm from '../components/contact/contact-form';

export interface ContactPageProps {}

const ContactPage: NextPage<ContactPageProps> = ({}) => {
	return (
		<>
			<Head>
				<title>Contact Me!</title>
				<meta name="description" content="Send me your messages!" />
			</Head>
			<ContactForm />
		</>
	);
};

export default ContactPage;
