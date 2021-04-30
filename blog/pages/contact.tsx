import { NextPage } from 'next';
import React from 'react';
import ContactForm from '../components/contact/contact-form';

export interface ContactPageProps {}

const ContactPage: NextPage<ContactPageProps> = ({}) => {
	return <ContactForm />;
};

export default ContactPage;
