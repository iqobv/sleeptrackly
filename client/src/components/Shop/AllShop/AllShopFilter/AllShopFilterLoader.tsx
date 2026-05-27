import { SkeletonLoader } from '@/components/UI';

const AllShopFilterLoader = () => {
	return (
		<div style={{ flex: '0 0 18.75rem' }}>
			<SkeletonLoader height={320} width="100%" />
		</div>
	);
};

export default AllShopFilterLoader;
