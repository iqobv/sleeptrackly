import { productBaseShape } from './productBase.schema';

export const updateProductSchema = productBaseShape
	.partial()
	.transform(({ bundleId: _bId, itemId: _iId, ...rest }) => ({ ...rest }));
