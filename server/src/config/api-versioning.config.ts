import { VersioningType } from '@nestjs/common';
import { VersioningOptions } from '@nestjs/common/interfaces';

export const getApiVersioningConfig = (): VersioningOptions => ({
	defaultVersion: '1',
	type: VersioningType.URI,
});
