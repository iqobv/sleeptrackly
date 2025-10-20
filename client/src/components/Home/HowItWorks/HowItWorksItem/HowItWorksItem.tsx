import { HowItWorksStep } from '../howItWorksSteps.js';
import styles from './HowItWorksItem.module.scss';

interface HowItWorksItemProps {
	item: HowItWorksStep;
	index: number;
}

const HowItWorksItem = ({ item, index }: HowItWorksItemProps) => {
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
				<p className={styles['how-it-works-item__title']}>{item.title}</p>
				<p className={styles['how-it-works-item__description']}>
					{item.description}
				</p>
			</div>
		</div>
	);
};

export default HowItWorksItem;
