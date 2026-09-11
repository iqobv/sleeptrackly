'use client';

import { CDNImage } from '@/components/UI';
import { env } from '@/env';
import { Field, Input } from '@shared/ui';
import Image from 'next/image';
import { useState } from 'react';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

interface FileFormProps<T extends FieldValues> {
	mediaUrl?: string;
	pathname?: Path<T>;
	label?: string;
	isAnimated?: boolean;
	width?: number;
	height?: number;
	required?: boolean;
}

export const FileForm = <T extends FieldValues>({
	mediaUrl,
	pathname,
	label = 'Upload File',
	isAnimated,
	height = 200,
	width = 200,
	required = false,
}: FileFormProps<T>) => {
	const [previewFile, setPreviewFile] = useState<File | null>(null);

	const fieldPath = pathname as Path<T>;

	const {
		setValue,
		formState: { errors },
	} = useFormContext<T>();

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
						<video width={width} height={height} muted autoPlay loop>
							<source src={`${env.NEXT_PUBLIC_CDN_URL}${mediaUrl}`} />
							Your browser does not support the video tag.
						</video>
					) : (
						<CDNImage
							width={width}
							height={height}
							path={mediaUrl}
							alt="avatar"
						/>
					)}
				</>
			)}
			{previewFile && (
				<>
					{previewFile.type.startsWith('image/') ? (
						<Image
							src={URL.createObjectURL(previewFile)}
							alt="Preview"
							width={width}
							height={height}
						/>
					) : previewFile.type.startsWith('video/') ? (
						<video width={width} height={height} muted autoPlay loop>
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
			<Field
				label={label}
				required={required}
				error={
					typeof errors[fieldPath]?.message === 'string'
						? (errors[fieldPath]?.message as string)
						: undefined
				}
			>
				<Input type="file" onChange={onFileChange} />
			</Field>
		</div>
	);
};
