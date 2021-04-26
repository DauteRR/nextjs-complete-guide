import React from 'react';
import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import LogisticsItem from './logistics-item';
import classes from './event-logistics.module.css';
import Image from 'next/image';

export interface EventLogisticsProps {
	date: string;
	address: string;
	image: string;
	imageAlt: string;
}

export const EventLogistics: React.FC<EventLogisticsProps> = ({
	date,
	address,
	image,
	imageAlt,
}) => {
	const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
	const addressText = address.replace(', ', '\n');

	return (
		<section className={classes.logistics}>
			<div className={classes.image}>
				<Image src={`/${image}`} alt={imageAlt} width={480} height={480} />
			</div>
			<ul className={classes.list}>
				<LogisticsItem icon={DateIcon}>
					<time>{humanReadableDate}</time>
				</LogisticsItem>
				<LogisticsItem icon={AddressIcon}>
					<address>{addressText}</address>
				</LogisticsItem>
			</ul>
		</section>
	);
};

export default EventLogistics;
