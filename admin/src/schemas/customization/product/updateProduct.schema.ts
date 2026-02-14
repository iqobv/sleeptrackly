import {
	mutualExclusionError,
	mutualExclusionRefinement,
	productBaseShape,
} from './productBase.schema';

export const updateProductSchema = productBaseShape.partial().refine((data) => {
	if (!data.itemId && !data.bundleId) return true;
	return mutualExclusionRefinement(data);
}, mutualExclusionError);
