import React from 'react';
import classes from './error-alert.module.css';

export interface ErrorAlertProps {}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ children }) => {
	return <div className={classes.alert}>{children}</div>;
};

export default ErrorAlert;
