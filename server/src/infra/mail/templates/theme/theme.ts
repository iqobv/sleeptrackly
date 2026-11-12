import { pixelBasedPreset, type TailwindConfig } from 'react-email';
import plugin from 'tailwindcss/plugin';

const colors = {
	bg: '#ffffff',
	'bg-2': '#f4f4f5',
	fg: '#171717',
	'fg-2': '#525252',
	'fg-3': '#ffffff',
	stroke: '#313131',
	accent: '#0A0A0A',
	link: '#0a0a0a',

	'bg-dark': '#0A0A0A',
	'bg-2-dark': '#131313',
	'fg-dark': '#ffffff',
	'fg-2-dark': '#d5d5d5',
	'fg-3-dark': '#0A0A0A',
	'stroke-dark': '#474747',
	'accent-dark': '#ffffff',
	'link-dark': '#ffffff',
} as const;

const fontScale = {
	11: {
		fontSize: '11px',
		fontWeight: '420',
		letterSpacing: '-0.033px',
		lineHeight: '1.5',
	},
	13: {
		fontSize: '13px',
		fontWeight: '420',
		letterSpacing: '-0.039px',
		lineHeight: '1.5',
	},
	14: { fontSize: '14px', fontWeight: '450', lineHeight: '1.5' },
	16: {
		fontSize: '16px',
		fontWeight: '420',
		letterSpacing: '-0.048px',
		lineHeight: '1.5',
	},
	24: {
		fontSize: '24px',
		fontWeight: '600',
		letterSpacing: '-0.084px',
		lineHeight: '1',
	},
	28: {
		fontSize: '28px',
		fontWeight: '600',
		letterSpacing: '-0.084px',
		lineHeight: '1.3',
	},
	32: {
		fontSize: '32px',
		fontWeight: '600',
		letterSpacing: '-0.64px',
		lineHeight: '1.25',
	},
	40: {
		fontSize: '40px',
		fontWeight: '600',
		letterSpacing: '-0.8px',
		lineHeight: '1.1',
	},
} as const;

export const themeConfig: TailwindConfig = {
	plugins: [
		plugin(({ addUtilities, addVariant }) => {
			addVariant('mobile', '@media (max-width: 600px)');
			const utilities: Record<string, Record<string, string>> = {};
			for (const [step, token] of Object.entries(fontScale)) {
				utilities[`.font-${step}`] = token;
			}
			addUtilities(utilities);
		}),
	],
	theme: {
		extend: {
			colors,
			fontFamily: {
				sans: ['Roboto', 'system-ui', 'Arial', 'sans-serif'],
			},
		},
	},
	presets: [pixelBasedPreset],
};
