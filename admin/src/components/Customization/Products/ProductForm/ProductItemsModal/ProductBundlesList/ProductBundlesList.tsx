'use client';

import { getAllAvailableBundles } from '@/api/customization/bundle/getAvaibleBundles.api';
import { BundleCard } from '@/components/Customization/BundleCard/BundleCard';
import { ItemsListPaginatedWrapper } from '@/components/Customization/ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Button } from '@shared/ui';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

type AvailableBundle = NonNullable<
	Awaited<ReturnType<typeof getAllAvailableBundles>>['items'][number]
>;

export const ProductBundlesList = <T extends FieldValues>() => {
	const { setValue, watch } = useFormContext<T>();
	const bundleId = watch('bundleId' as Path<T>);

	const handleSelect = (id: string) => {
		setValue('bundleId' as Path<T>, id as PathValue<T, Path<T>>);
		setValue('itemId' as Path<T>, undefined as PathValue<T, Path<T>>);
	};

	return (
		<ItemsListPaginatedWrapper<AvailableBundle>
			queryFn={({ language: _l, ...params }) => getAllAvailableBundles(params)}
			queryKey={({ language: _l, ...params }) =>
				QUERY_KEYS.customization.bundle.listAvailable(params)
			}
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
