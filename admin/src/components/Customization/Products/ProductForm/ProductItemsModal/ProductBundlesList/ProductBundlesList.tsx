'use client';

import { getAllAvailableBundles } from '@/api';
import BundleCard from '@/components/Customization/BundleCard/BundleCard';
import ItemsListPaginatedWrapper from '@/components/Customization/ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import { Button } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { PaginationDto } from '@/dto';
import { Bundle } from '@/types';
import { useSearchParams } from 'next/navigation';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

const ProductBundlesList = <T extends FieldValues>() => {
	const searchParams = useSearchParams();
	const pageFromParams = Number(searchParams.get('page')) || 1;

	const params: PaginationDto = {
		page: pageFromParams,
		limit: 20,
	};

	const { setValue, watch } = useFormContext<T>();

	const bundleId = watch('bundleId' as Path<T>);

	const handleSelect = (id: string) => {
		setValue('bundleId' as Path<T>, id as PathValue<T, Path<T>>);
		setValue('itemId' as Path<T>, undefined as PathValue<T, Path<T>>);
	};

	return (
		<ItemsListPaginatedWrapper<Bundle>
			queryFn={() => getAllAvailableBundles(params)}
			queryKey={() => [
				...QUERY_KEYS.customization.bundle.getAllAvailable(params),
			]}
			isModal
			itemCard={(bundle) => (
				<BundleCard
					bundle={bundle}
					actions={
						<Button
							variant="contained"
							color={bundleId === bundle.id ? 'primary' : 'secondary'}
							fullWidth
							onClick={() => handleSelect(bundle.id)}
						>
							{bundleId === bundle.id ? 'Selected' : 'Select'}
						</Button>
					}
				/>
			)}
		/>
	);
};

export default ProductBundlesList;
