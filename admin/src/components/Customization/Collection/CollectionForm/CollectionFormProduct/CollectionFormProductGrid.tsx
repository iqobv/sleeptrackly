'use client';

import { ProductCard } from '@/components/Customization/Products/ProductsList/ProductCard/ProductCard';
import { Product } from '@/types/customization/product/product.types';
import { Button, Grid } from '@shared/ui';
import { SelectedProduct } from './CollectionFormProduct';
import styles from './CollectionFormProduct.module.scss';

interface CollectionFormProductGridProps {
	products: Product[];
	selectedProducts: SelectedProduct[];
	onToggleProduct: (product: Product) => void;
}

export const CollectionFormProductGrid = ({
	products,
	selectedProducts,
	onToggleProduct,
}: CollectionFormProductGridProps) => {
	return (
		<Grid className={styles.grid}>
			{products.map((product) => {
				const isSelected = selectedProducts.some((p) => p.id === product.id);

				return (
					<ProductCard key={product.id} product={product}>
						{(product) => (
							<Button
								variant="contained"
								color={isSelected ? 'secondary' : 'primary'}
								onClick={() => onToggleProduct(product)}
								fullWidth
							>
								{isSelected ? 'Deselect' : 'Select'}
							</Button>
						)}
					</ProductCard>
				);
			})}
		</Grid>
	);
};
