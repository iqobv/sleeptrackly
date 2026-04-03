import { SkeletonLoader } from '@/components/UI';

const items = Array.from({ length: 10 }, (_, i) => (
	<SkeletonLoader key={i} height={40} />
));

const PromotionsListLoader = () => {
	return <>{items}</>;
};

export default PromotionsListLoader;
