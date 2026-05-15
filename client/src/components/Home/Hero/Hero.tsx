import { Button } from '@/components/UI';
import { AUTH_PAGES } from '@/config';
import styles from './Hero.module.scss';

const Hero = () => {
	return (
		<div className={`${styles['hero']}`}>
			<div className={`${styles['hero__container']} container`}>
				<h1 className={styles['hero__title']}>
					Take Control of Your Sleep, One Night at a Time.
				</h1>
				<p className={styles['hero__description']}>
					Track your sleep, analyze weekly patterns, and build better habits
					with personalized challenges. Your journey to restful nights starts
					now.
				</p>
				<Button href={AUTH_PAGES.REGISTER} className={styles['hero__button']}>
					Join Now
				</Button>
			</div>
		</div>
	);
};

export default Hero;
