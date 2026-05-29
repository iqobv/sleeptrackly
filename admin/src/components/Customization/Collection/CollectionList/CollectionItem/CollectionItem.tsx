'use client';

import { Button, CDNImage } from '@/components/UI';
import { PAGES } from '@/config';
import { BaseCollection } from '@/types';
import Link from 'next/link';
import { MdEdit } from 'react-icons/md';
import styles from './CollectionItem.module.scss';

interface CollectionItemProps {
	collection: BaseCollection;
}

export const CollectionItem = ({ collection }: CollectionItemProps) => {
	return (
		<div className={styles.item}>
			<div className={styles.info}>
				<CDNImage src={collection.iconUrl} width={64} height={64} />
				<Link href={PAGES.COLLECTION(collection.id)}>{collection.slug}</Link>
			</div>
			<Button variant="text" isIcon isRounded asChild>
				<Link href={PAGES.COLLECTION(collection.id)}>
					<MdEdit />
				</Link>
			</Button>
		</div>
	);
};
