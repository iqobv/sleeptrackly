import { AUTH_PAGES } from '@/config';
import { Button } from '@shared/ui';
import Link from 'next/link';
import styles from './Hero.module.scss';

const Hero = () => {
	return (
		<div className={`${styles.hero}`}>
			<div className={`${styles.container} container`}>
				<h1 className={styles.title}>
					Take Control of Your Sleep, One Night at a Time.
				</h1>
				<p className={styles.description}>
					Track your sleep, analyze weekly patterns, and build better habits
					with personalized challenges. Your journey to restful nights starts
					now.
				</p>
				<Button className={styles.button} asChild>
					<Link href={AUTH_PAGES.REGISTER}>Join Now</Link>
				</Button>
			</div>
		</div>
	);
};

export default Hero;
