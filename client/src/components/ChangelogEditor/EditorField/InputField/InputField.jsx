import { useFormContext } from 'react-hook-form';

import Textarea from '../../Textarea/Textarea';

import styles from './InputField.module.scss';

const InputField = ({ field, ...props }) => {
	const { register } = useFormContext();

	return (
		<Textarea
			fieldName={field?.name}
			register={register(field.name)}
			type="input"
		/>
	);
};

export default InputField;
