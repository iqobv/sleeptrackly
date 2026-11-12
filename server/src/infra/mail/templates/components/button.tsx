import React from 'react';
import { Button as REButton } from 'react-email';

interface ButtonProps extends React.ComponentProps<typeof REButton> {
	children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
	return (
		<REButton
			className={`bg-accent dark:bg-accent-dark font-base font-semibold cursor-pointer text-fg-3 dark:text-fg-3-dark inline-block px-[20px] py-[14px] text-left rounded-[8px] border border-solid border-stroke dark:border-transparent ${props.className ?? ''}`}
			{...props}
		>
			{children}
		</REButton>
	);
};

export default Button;
