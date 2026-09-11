import { Container, SectionHeader, Typography } from '@shared/ui';
import styles from './HowItWorks.module.scss';
import { HOW_IT_WORKS } from './howItWorksSteps';

export const HowItWorks = () => {
	return (
		<Container>
			<SectionHeader
				title="The Process"
				description="Stop relying on background tracking. Take conscious control of your schedule through daily manual logs."
				titleProps={{
					variant: 'h2',
					textTransform: 'uppercase',
				}}
				descriptionProps={{
					color: 'secondary',
				}}
				padding={80}
			/>
			<div className={styles.wrapper}>
				{HOW_IT_WORKS.map((item, index) => (
					<div key={index} className={styles.item}>
						<div className={styles.numberWrapper}>
							<span className={styles.number}>
								{(index + 1).toString().padStart(2, '0')}
							</span>
						</div>
						<div className={styles.content}>
							<Typography variant="h3">{item.title}</Typography>
							<Typography variant="body1" color="secondary">
								{item.description}
							</Typography>
						</div>
					</div>
				))}
			</div>
		</Container>
	);
};
