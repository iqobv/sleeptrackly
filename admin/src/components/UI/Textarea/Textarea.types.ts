import { Ref } from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';

export interface TextareaProps extends TextareaAutosizeProps {
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
	error?: boolean;
	ref?: Ref<HTMLTextAreaElement>;
}
