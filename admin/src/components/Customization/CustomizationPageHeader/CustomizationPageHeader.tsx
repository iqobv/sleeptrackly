import { SectionHeader, SectionHeaderProps } from '@/components/UI';
import { Button, ButtonProps } from '@/components/UI/Button';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import styles from './CustomizationPageHeader.module.scss';

interface CustomizationPageHeaderProps {
	title: React.ReactNode;
	sectionHeaderProps?: Omit<SectionHeaderProps, 'title'>;
	buttonProps?: Omit<ButtonProps, 'children'>;
	href?: string;
	buttonText?: string;
	customButton?: React.ReactNode;
}

export const CustomizationPageHeader = ({
	title,
	sectionHeaderProps,
	buttonProps,
	buttonText,
	customButton,
	href = '',
}: CustomizationPageHeaderProps) => {
	const showButton = customButton || href || buttonText || buttonProps;

	return (
		<div className={styles.header}>
			<SectionHeader title={title} {...sectionHeaderProps} />
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
	);
};
