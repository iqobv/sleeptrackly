'use client';

import { Button } from '@/components/UI';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { FaRegMoon, FaRegSun } from 'react-icons/fa6';
import styles from './ThemeSwitcher.module.scss';

const iconProps: IconBaseProps = {
	size: 22,
	suppressHydrationWarning: true,
};

const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleClick = () =>
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

	if (!mounted) return null;

	return (
		<div className={styles['theme-switcher']}>
			<Button onClick={handleClick} isIcon variant="text">
				{resolvedTheme === 'dark' ? (
					<FaRegSun {...iconProps} />
				) : (
					<FaRegMoon {...iconProps} />
				)}
			</Button>
		</div>
	);
};

export default ThemeSwitcher;
