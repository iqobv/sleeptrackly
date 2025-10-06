'use client';

import { Avatar, Button } from '@/components/UI';
import { PAGES } from '@/config';
import { IFriend } from '@/types';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineMoreVert } from 'react-icons/md';
import styles from './FriendItem.module.scss';
import { FRIEND_ITEM_MENU } from './friendItemMenu';

interface FriendItemProps {
	friend: IFriend;
}

const FriendItem = ({ friend }: FriendItemProps) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const [menuOpen, setMenuOpen] = useState(false);
	const [menuUp, setMenuUp] = useState(false);

	const handleCloseOutside = (event: MouseEvent) => {
		if (
			containerRef.current &&
			!containerRef.current.contains(event.target as Node)
		) {
			setMenuOpen(false);
		}
	};

	const updateMenuPosition = useCallback(() => {
		if (menuOpen && menuRef.current && containerRef.current) {
			const menuRect = menuRef.current.getBoundingClientRect();
			const containerRect = containerRef.current.getBoundingClientRect();
			const viewportHeight = window.innerHeight;

			if (containerRect.bottom + menuRect.height > viewportHeight) {
				setMenuUp(true);
			} else {
				setMenuUp(false);
			}
		}
	}, [menuOpen]);

	useEffect(() => {
		document.addEventListener('mousedown', handleCloseOutside);
		window.addEventListener('resize', updateMenuPosition);
		window.addEventListener('scroll', updateMenuPosition, true);

		return () => {
			document.removeEventListener('mousedown', handleCloseOutside);
			window.removeEventListener('resize', updateMenuPosition);
			window.removeEventListener('scroll', updateMenuPosition, true);
		};
	}, [menuOpen, updateMenuPosition]);

	useEffect(() => {
		updateMenuPosition();
	}, [menuOpen, updateMenuPosition]);

	const handleOpenMenu = (e: React.MouseEvent) => {
		e.stopPropagation();
		setMenuOpen((prev) => !prev);
	};

	return (
		<div className={styles['friend-item']}>
			<div className={styles['friend-item__info']}>
				<Avatar avatar={friend.user?.avatar} size={45} />
				<div>
					<Link
						className={styles['friend-item__username']}
						href={PAGES.PROFILE(friend.user.username)}
					>
						{friend.user.username}
					</Link>
					<p className={styles['friend-item__status']}>
						{friend.user.isSleeping ? 'Sleeping' : 'Offline'}
					</p>
				</div>
			</div>
			<div ref={containerRef} className={styles['friend-item__actions']}>
				<Button onClick={handleOpenMenu} variant="text" isIcon>
					<MdOutlineMoreVert size={24} />
				</Button>
				{menuOpen && (
					<div
						ref={menuRef}
						className={`${styles['friend-item__menu']} ${
							menuUp ? styles['friend-item__menu--up'] : ''
						}`}
					>
						{FRIEND_ITEM_MENU.map((item) => (
							<Button
								variant="text"
								fullWidth
								className={styles['friend-item__menu-item']}
								key={item.label}
								onClick={() => item.onClick(friend.id)}
							>
								{item.label}
							</Button>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default FriendItem;
