import { SkeletonLoader } from '@shared/ui';
import { ItemCardLoader } from '../../ItemCard/ItemCardLoader';
import { ItemsListWrapperLoader } from '../../ItemsListWrapper/ItemsListWrapperLoader';

interface BundleFormProps {
	isEdit?: boolean;
}

const ButtonLoader = () => <SkeletonLoader height="2.75rem" width="7.5rem" />;

export const BundleItemsLoader = ({ isEdit = false }: BundleFormProps) => (
	<>
		<ButtonLoader />
		{isEdit && (
			<ItemsListWrapperLoader>
				{Array.from({ length: 3 }).map((_, i) => (
					<ItemCardLoader key={i} />
				))}
			</ItemsListWrapperLoader>
		)}
	</>
);
