import { pxToRem, SkeletonLoader } from '@shared/ui';

export const ReminderLoader = () => {
	return (
		<div style={{ maxWidth: pxToRem(600), width: '100%', margin: '0 auto' }}>
			<SkeletonLoader height={270} width="100%" />
		</div>
	);
};
