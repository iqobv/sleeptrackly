import { Grid, PaginationLoader } from '@/components/UI';
import { CustomizationPageHeaderLoader } from '../../CustomizationPageHeader';
import { ProductCardLoader } from './ProductCard';
import styles from './ProductsList.module.scss';

export const ProductsListLoader = () => (
	<Grid
		columns="repeat(auto-fill, minmax(15.625rem, 1fr))"
		oneColumnOnMobile={false}
	>
		{Array.from({ length: 20 }).map((_, i) => (
			<ProductCardLoader key={i} />
		))}
	</Grid>
);

export const ProductsLoader = () => (
	<>
		<CustomizationPageHeaderLoader />
		<div className={styles.list}>
			<ProductsListLoader />
			<PaginationLoader />
		</div>
	</>
);
