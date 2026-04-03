'use client';

import React from 'react';
import styles from './DashboardCard.module.scss';

interface DashboardCardProps {
	children: React.ReactNode;
	className?: string;
}

const DashboardCard = ({ children, className }: DashboardCardProps) => {
	return (
		<div className={`${styles['dashboard-card']} ${className || ''}`}>
			{children}
		</div>
	);
};

export default DashboardCard;
