'use client';

import { ShopFilterDto } from '@/dto/shop/shop.dto';
import { Grid, GridItem, Pagination } from '@shared/ui';
import { FormProvider } from 'react-hook-form';
import { ShopCard } from '../ShopCard/ShopCard';
import styles from './AllShop.module.scss';
import { AllShopFilter } from './AllShopFilter/AllShopFilter';
import { AllShopFilterSearchBar } from './AllShopFilterSearchBar/AllShopFilterSearchBar';
import { AllShopItemsLoader } from './AllShopLoader';
import { useAllShop } from './useAllShop.hook';

export type AllShopFiltersForm = ShopFilterDto & { sort?: string };

export const AllShop = () => {
	const { methods, currentPage, data, handlePageChange, isLoading } =
		useAllShop();

	return (
		<FormProvider {...methods}>
			<form onSubmit={(e) => e.preventDefault()}>
				<div className={styles.content}>
					<AllShopFilter />
					<div className={styles.itemsContainer}>
						<AllShopFilterSearchBar />
						<div className={styles.items}>
							{isLoading && <AllShopItemsLoader />}
							{data && !isLoading && data.items.length > 0 && (
								<>
									<Grid className={styles.itemsGrid} columns={3}>
										{data.items.map((item) => (
											<GridItem key={item.id}>
												<ShopCard key={item.id} product={item} />
											</GridItem>
										))}
									</Grid>
									<Pagination
										currentPage={currentPage}
										totalPages={data.meta.totalPages}
										onPageChange={handlePageChange}
									/>
								</>
							)}
							{data && !isLoading && data.items.length === 0 && (
								<div className={styles.noResults}>
									No products found with current filters
								</div>
							)}
						</div>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};
