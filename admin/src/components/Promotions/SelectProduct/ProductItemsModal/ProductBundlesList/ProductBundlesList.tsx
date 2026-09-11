'use client';

import { getAllBundles } from '@/api/customization/bundle/getAllBundles.api';
import { BundleCard } from '@/components/Customization/BundleCard/BundleCard';
import { ItemsListPaginatedWrapper } from '@/components/Customization/ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Bundle } from '@/types/customization/bundle/bundle.types';
import { Button } from '@shared/ui';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

export const ProductBundlesList = <T extends FieldValues>() => {
	const { setValue, watch } = useFormContext<T>();

	const bundleId = watch('bundleId' as Path<T>);

	const handleSelect = (id: string) => {
		setValue('bundleId' as Path<T>, id as PathValue<T, Path<T>>);
		setValue('itemId' as Path<T>, undefined as PathValue<T, Path<T>>);
	};

	return (
		<ItemsListPaginatedWrapper<Bundle>
			queryFn={(params) => getAllBundles(params)}
			queryKey={(params) => QUERY_KEYS.customization.bundle.list(params)}
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
