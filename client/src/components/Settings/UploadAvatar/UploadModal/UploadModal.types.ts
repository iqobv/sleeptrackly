import { type ReactNode, type FC } from 'react';

export interface UploadModalProps {
  children?: ReactNode;
}

export type UploadModalType = FC<UploadModalProps>;