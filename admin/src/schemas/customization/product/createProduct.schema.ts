import {
	mutualExclusionError,
	mutualExclusionRefinement,
	productBaseShape,
} from './productBase.schema';

export const createProductSchema = productBaseShape.refine(
	mutualExclusionRefinement,
	mutualExclusionError,
);
