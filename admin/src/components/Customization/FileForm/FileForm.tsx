'use client';

import { CDNImage, TextField } from '@/components/UI';
import Image from 'next/image';
import { useState } from 'react';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

interface FileFormProps {
	mediaUrl?: string;
	isAnimated?: boolean;
}

const FileForm = <T extends FieldValues>({
	mediaUrl,
	isAnimated,
}: FileFormProps) => {
	const [previewFile, setPreviewFile] = useState<File | null>(null);

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
			setValue('file' as Path<T>, file as PathValue<T, Path<T>>, {
				shouldValidate: true,
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
					typeof errors.file?.message === 'string'
						? errors.file.message
						: undefined
				}
				type="file"
				label="Upload File"
				onChange={onFileChange}
			/>
		</div>
	);
};

export default FileForm;
