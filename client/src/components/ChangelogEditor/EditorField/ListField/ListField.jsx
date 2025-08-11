import { useFieldArray, useFormContext } from 'react-hook-form';

import { MdDelete } from 'react-icons/md';

import Textarea from '../../Textarea/Textarea';

import styles from './ListField.module.scss';

const ListField = ({ field, ...props }) => {
	const { register, control } = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: `content.${field.name}.items`,
	});

	return (
		<div className={styles['list-field']}>
			<Textarea
				fieldName={field?.name}
				register={register(`content.${field.name}.summary`)}
			/>
			<ul className={styles['list']}>
				{fields.map((item, index) => (
					<li key={item.id} className={styles['list-item']}>
						<Textarea
							fieldName={`content.${field.name}.items.${index}`}
							type="items"
							register={register(`content.${field.name}.items.${index}`)}
						/>
						<button
							type="button"
							onClick={() => remove(index)}
							className={styles['delete-button']}
						>
							<MdDelete />
						</button>
					</li>
				))}
			</ul>
			<button type="button" onClick={() => append('')}>
				Add
			</button>
		</div>
	);
};

export default ListField;
