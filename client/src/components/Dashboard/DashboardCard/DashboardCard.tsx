'use client';

import React from 'react';
import styles from './DashboardCard.module.scss';

interface DashboardCardProps {
	children: React.ReactNode;
	className?: string;
}

export const DashboardCard = ({ children, className }: DashboardCardProps) => {
	return <div className={`${styles.card} ${className || ''}`}>{children}</div>;
};
