'use client';

import { CDNImage, TextField } from '@/components/UI';
import Image from 'next/image';
import { useState } from 'react';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

interface FileFormProps<T extends FieldValues> {
	mediaUrl?: string;
	pathname?: Path<T>;
	label?: string;
	isAnimated?: boolean;
}

const FileForm = <T extends FieldValues>({
	mediaUrl,
	pathname,
	label = 'Upload File',
	isAnimated,
}: FileFormProps<T>) => {
	const [previewFile, setPreviewFile] = useState<File | null>(null);

	const fieldPath = pathname as Path<T>;

	const methods = useFormContext<T>();

	const {
		setValue,
		formState: { errors },
	} = methods;

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			setPreviewFile(file);
			setValue(fieldPath, file as PathValue<T, Path<T>>, {
				shouldValidate: true,
				shouldDirty: true,
			});
		}
	};

	return (
		<div>
			{mediaUrl && !previewFile && (
				<>
					{isAnimated ? (
						<video width="320" height="240" muted autoPlay loop>
							<source src={`${process.env.NEXT_PUBLIC_CDN_URL}${mediaUrl}`} />
							Your browser does not support the video tag.
						</video>
					) : (
						<CDNImage src={mediaUrl} />
					)}
				</>
			)}
			{previewFile && (
				<>
					{previewFile.type.startsWith('image/') ? (
						<Image
							src={URL.createObjectURL(previewFile)}
							alt="Preview"
							width={100}
							height={100}
						/>
					) : previewFile.type.startsWith('video/') ? (
						<video width="320" height="240" muted autoPlay loop>
							<source
								src={URL.createObjectURL(previewFile)}
								type={previewFile.type}
							/>
							Your browser does not support the video tag.
						</video>
					) : (
						<p>Preview not available for this file type.</p>
					)}
				</>
			)}
			<TextField
				error={
					typeof errors[fieldPath]?.message === 'string'
						? (errors[fieldPath]?.message as string)
						: undefined
				}
				type="file"
				label={label}
				onChange={onFileChange}
			/>
		</div>
	);
};

export default FileForm;
