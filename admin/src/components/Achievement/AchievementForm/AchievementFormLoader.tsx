import { FileFormLoader } from '@/components/Customization/FileForm/FileFormLoader';
import { FormContentLoader, FormFieldsLoader } from '@/components/UI';
import { ACHIEVEMENT_FORM_FIELDS } from './achievementFormFields';

export const AchievementFormLoader = () => (
	<FormContentLoader>
		<FileFormLoader />
		<FormFieldsLoader
			fields={ACHIEVEMENT_FORM_FIELDS.map((f) => ({
				label: !!f.label,
				type: f.type,
			}))}
		/>
	</FormContentLoader>
);
