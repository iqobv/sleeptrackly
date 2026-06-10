'use client';

import { FormContent } from '@/components/UI';

interface PromotionFromProps {
	isLoading?: boolean;
	isEditing?: boolean;
	children?: React.ReactNode;
}

export const PromotionForm = ({
	isEditing = false,
	isLoading = false,
	children,
}: PromotionFromProps) => {
	return (
		<FormContent
			isLoading={isLoading}
			buttonLabel={isEditing ? 'Update' : 'Create'}
			isEdit={isEditing}
		>
			{children}
		</FormContent>
	);
};
