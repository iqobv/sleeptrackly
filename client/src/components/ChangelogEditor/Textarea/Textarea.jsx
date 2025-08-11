import TextareaAutosize from 'react-textarea-autosize';

import styles from './Textarea.module.scss';

const Textarea = ({ fieldName, type = 'summary', register, ...props }) => {
	return (
		<TextareaAutosize
			id={fieldName}
			name={fieldName}
			className={`${styles['textarea']} ${styles[type]}`}
			{...register}
			{...props}
		/>
	);
};

export default Textarea;
