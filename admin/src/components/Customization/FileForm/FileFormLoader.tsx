import { FormFieldsLoader } from '@/components/UI';
import { SkeletonLoader } from '@shared/ui';

interface FileFormLoaderProps {
	isEdit?: boolean;
}

const FieldLoader = () => (
	<FormFieldsLoader
		fields={[
			{
				label: true,
				type: 'file',
			},
		]}
	/>
);

export const FileFormLoader = ({ isEdit = false }: FileFormLoaderProps) => (
	<>
		{isEdit && <SkeletonLoader width="12.5rem" height="12.5rem" />}
		<FieldLoader />
	</>
);
