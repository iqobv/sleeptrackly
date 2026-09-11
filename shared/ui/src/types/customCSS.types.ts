import { CSSProperties } from 'react';

export interface CustomCSSProperties extends CSSProperties {
	[key: `--${string}`]: string | number;
}
