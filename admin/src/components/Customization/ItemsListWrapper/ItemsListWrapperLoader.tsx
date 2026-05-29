import { Grid } from '@/components/UI';

interface ItemsListWrapperLoaderProps {
	children?: React.ReactNode;
}

export const ItemsListWrapperLoader = ({
	children,
}: ItemsListWrapperLoaderProps) => {
	return (
		<Grid
			columns="repeat(auto-fill, minmax(15.625rem, 1fr))"
			oneColumnOnMobile={false}
		>
			{children}
		</Grid>
	);
};
