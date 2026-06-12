import { SectionHeader } from '@shared/ui';
import { HowItWorksStep } from '../howItWorksSteps';
import styles from './HowItWorksItem.module.scss';

interface HowItWorksItemProps {
	item: HowItWorksStep;
	index: number;
}

export const HowItWorksItem = ({ item, index }: HowItWorksItemProps) => {
	return (
		<div
			className={styles['how-it-works-item']}
			style={
				{
					'--i': index,
				} as React.CSSProperties
			}
		>
			<div className={styles['how-it-works-item__step']}>
				{(index + 1).toString().padStart(2, '0')}
			</div>
			<div>
				<SectionHeader
					title={item.title}
					titleProps={{
						variant: 'h3',
					}}
					padding={0}
					description={item.description}
				/>
			</div>
		</div>
	);
};
