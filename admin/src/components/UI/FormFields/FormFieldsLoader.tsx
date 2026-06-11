import { Field } from '@/types';
import { SkeletonLoader } from '@shared/ui';

type FieldLoader = Pick<Field<unknown>, 'type'> & { label?: boolean };

interface FormFieldsLoaderProps {
	fields: FieldLoader[];
}

interface FormFieldLoaderProps {
	children: React.ReactNode;
}

const FormFieldLoader = ({ children }: FormFieldLoaderProps) => (
	<div style={{ padding: '0.5rem 0', width: '100%' }}>{children}</div>
);

export const FormFieldsLoader = ({ fields }: FormFieldsLoaderProps) => (
	<>
		{fields.map(({ type = 'text', label = true }, i) => {
			if (type === 'hidden') return null;
			if (type === 'checkbox')
				return <SkeletonLoader key={i} height="1.25rem" width="11.875rem" />;
			return (
				<FormFieldLoader key={i}>
					{label ? (
						<SkeletonLoader height="4.9375rem" width="100%" />
					) : (
						<SkeletonLoader height="2.8125rem" width="100%" />
					)}
				</FormFieldLoader>
			);
		})}
	</>
);
