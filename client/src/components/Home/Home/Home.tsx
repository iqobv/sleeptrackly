import CtaSection from '../CtaSection/CtaSection';
import Faq from '../Faq/Faq';
import Features from '../Features/Features';
import Hero from '../Hero/Hero';
import HowItWorks from '../HowItWorks/HowItWorks';
import styles from './Home.module.scss';

const Home = () => {
	return (
		<div className={`${styles.home} fade-in`}>
			<Hero />
			<Features />
			<HowItWorks />
			<Faq />
			<CtaSection />
		</div>
	);
};

export default Home;
