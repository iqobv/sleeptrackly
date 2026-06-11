import { ProductCardLoader } from '@/components/Customization/Products/ProductsList/ProductCard';
import { Grid, SkeletonLoader } from '@shared/ui';
import styles from './CollectionFormProduct.module.scss';

interface CollectionFormProductLoaderProps {
	isEdit?: boolean;
}

const ButtonLoader = () => (
	<SkeletonLoader height="4.875rem" width="11.25rem" />
);

export const CollectionFormProductLoader = ({
	isEdit = false,
}: CollectionFormProductLoaderProps) => {
	if (!isEdit) return <ButtonLoader />;
	if (isEdit)
		return (
			<div>
				<ButtonLoader />
				<Grid className={styles.grid}>
					{Array.from({ length: 4 }).map((_, i) => (
						<ProductCardLoader key={i} />
					))}
				</Grid>
			</div>
		);
};
