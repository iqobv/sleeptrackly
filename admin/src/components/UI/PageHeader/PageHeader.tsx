import { Button, SectionHeader } from '@shared/ui';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import { NavigationBackButton } from '../NavigationBackButton/NavigationBackButton';
import styles from './PageHeader.module.scss';
import { PageHeaderProps } from './PageHeader.types';

export const PageHeader = ({
	title,
	description,
	sectionHeaderProps,
	buttonProps,
	buttonText,
	customButton,
	showBackButton = true,
	href = '',
	customRightSlot,
}: PageHeaderProps) => {
	const showButton = !!customButton || !!href || !!buttonText || !!buttonProps;

	return (
		<div className={styles.header}>
			{showBackButton && <NavigationBackButton />}
			<div className={styles.content}>
				<SectionHeader
					title={title}
					description={description}
					padding={sectionHeaderProps?.padding || 0}
					{...sectionHeaderProps}
				/>
				{!!customRightSlot && customRightSlot}
				{showButton && (
					<Button isIcon={buttonProps?.isIcon || true} {...buttonProps} asChild>
						{customButton ? (
							customButton
						) : (
							<Link href={href}>
								<MdAdd size={24} />
								<span className={styles.text}>{buttonText}</span>
							</Link>
						)}
					</Button>
				)}
			</div>
		</div>
	);
};
