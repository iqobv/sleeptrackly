'use client';

import { List, SectionHeader } from '@/components/UI';
import styles from './HowItWorks.module.scss';
import HowItWorksItem from './HowItWorksItem/HowItWorksItem';
import { HOW_IT_WORKS } from './howItWorksSteps';

const HowItWorks = () => {
	return (
		<div className={`${styles['how-it-works']} container`}>
			<SectionHeader title="How It Works" titleComponent="h2" />
			<List
				items={HOW_IT_WORKS}
				className={styles['how-it-works__list']}
				gap={20}
				renderItem={(item, index) => (
					<HowItWorksItem key={item.title} item={item} index={index} />
				)}
			/>
		</div>
	);
};

export default HowItWorks;
