'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { FaRegMoon } from 'react-icons/fa6';
import { MdOutlineWbSunny } from 'react-icons/md';
import { MenuItem } from '../MenuItem/MenuItem';

const iconProps: IconBaseProps = {
	size: 20,
	suppressHydrationWarning: true,
};

export const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleClick = () =>
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

	if (!mounted) return null;

	return (
		<MenuItem
			onClick={handleClick}
			icon={
				resolvedTheme === 'dark' ? (
					<FaRegMoon {...iconProps} />
				) : (
					<MdOutlineWbSunny {...iconProps} />
				)
			}
			label="Switch Theme"
		/>
	);
};
