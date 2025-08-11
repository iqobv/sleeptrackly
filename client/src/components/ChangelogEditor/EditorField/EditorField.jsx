import InputField from './InputField/InputField';
import TextareaField from './TextareaField/TextareaField';
import CheckboxField from './CheckboxField/CheckboxField';
import ListField from './ListField/ListField';

import styles from './EditorField.module.scss';

const EditorField = ({ field, ...props }) => {
	return (
		<div
			className={`${styles['editor-field']} ${
				field.type === 'checkbox' ? styles['checkbox-field'] : ''
			}`}
		>
			<label htmlFor={field.name} className={styles['editor-field-label']}>
				{field.label}
			</label>
			{field.type === 'input' && <InputField field={field} {...props} />}
			{field.type === 'textarea' && <TextareaField field={field} {...props} />}
			{field.type === 'checkbox' && <CheckboxField field={field} {...props} />}
			{field.type === 'list' && <ListField field={field} {...props} />}
			<p></p>
		</div>
	);
};

export default EditorField;
