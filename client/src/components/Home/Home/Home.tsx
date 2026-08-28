import { CtaSection } from '../CtaSection/CtaSection';
import { Features } from '../Features/Features';
import { Hero } from '../Hero/Hero';
import { HowItWorks } from '../HowItWorks/HowItWorks';
import styles from './Home.module.scss';

export const Home = () => {
	return (
		<div className={styles.home}>
			<Hero />
			<Features />
			<HowItWorks />
			<CtaSection />
		</div>
	);
};
