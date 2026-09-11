import { PAGES } from '@/config/pages.config';

interface CustomizationLink {
	label: string;
	href: string;
}

export const CUSTOMIZATION_LINKS: CustomizationLink[] = [
	{
		label: 'Go To Items',
		href: PAGES.ITEMS,
	},
	{
		label: 'Go To Bundles',
		href: PAGES.BUNDLES,
	},
	{
		label: 'Go To Products',
		href: PAGES.PRODUCTS,
	},
	{
		label: 'Go To Collections',
		href: PAGES.COLLECTIONS,
	},
];
