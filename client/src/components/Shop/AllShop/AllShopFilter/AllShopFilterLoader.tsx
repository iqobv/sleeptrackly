import { SkeletonLoader } from '@/components/UI';

const AllShopFilterLoader = () => {
	return (
		<div style={{ flex: '0 0 300px' }}>
			<SkeletonLoader height={320} width="100%" />
		</div>
	);
};

export default AllShopFilterLoader;
