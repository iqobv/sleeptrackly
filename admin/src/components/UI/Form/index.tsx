import FormActions from './FormActions/FormActions';
import FormField from './FormField/FormField';
import FormProvider from './FormProvider';
import FormReset from './FormReset/FormReset';
import FormSubmit from './FormSubmit/FormSubmit';

export const Form = Object.assign(FormProvider, {
	Field: FormField,
	Actions: FormActions,
	Reset: FormReset,
	Submit: FormSubmit,
});
