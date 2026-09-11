import { Product } from '@/types/customization/product/product.types';
import { FieldValues, Path } from 'react-hook-form';

export interface FormProductProps<D extends FieldValues> {
	initProduct?: Product | null;
	name: Path<D>;
}
