'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';
import { SelectContentProps } from '../Select.types';
import styles from './SelectContent.module.scss';

export const SelectContent = ({
	children,
	className,
	position = 'popper',
	sideOffset = 4,
	width = 'trigger',
	ref,
	style,
	...props
}: SelectContentProps) => {
	const widthStyles: React.CSSProperties = {
		width: width === 'trigger' ? 'var(--radix-select-trigger-width)' : width,
		minWidth:
			width === 'trigger' ? 'var(--radix-select-trigger-width)' : undefined,
	};

	const handleCloseAutoFocus = (e: Event) => {
		if (document.activeElement && document.activeElement !== document.body) {
			e.preventDefault();
		}
	};

	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				ref={ref}
				className={clsx(styles.content, className)}
				position={position}
				sideOffset={sideOffset}
				style={{ ...widthStyles, ...style }}
				onCloseAutoFocus={handleCloseAutoFocus}
				{...props}
			>
				<SelectPrimitive.Viewport className={styles.viewport}>
					{children}
				</SelectPrimitive.Viewport>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
};
