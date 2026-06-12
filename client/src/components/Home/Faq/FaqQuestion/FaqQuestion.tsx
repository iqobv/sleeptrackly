'use client';

import { MdArrowCircleDown } from 'react-icons/md';
import type { FaqQuestion as FaqQuestionType } from '../faqQuestions';
import styles from './FaqQuestion.module.scss';

interface FaqQuestionProps {
	item: FaqQuestionType;
	isOpen: boolean;
	activeIndex: number;
	index: number;
	handleClick: (index: number) => void;
}

export const FaqQuestion = ({
	item,
	activeIndex,
	isOpen,
	index,
	handleClick,
}: FaqQuestionProps) => {
	const isActive = isOpen && index === activeIndex;

	const onClick = () => handleClick(index);

	return (
		<div className={styles['faq-item']}>
			<div
				className={`${styles['faq-item__question']} ${
					isActive ? styles['faq-item__question--active'] : ''
				}`}
				onClick={onClick}
			>
				<p>{item.question}</p>
				<div>
					<MdArrowCircleDown
						size={22}
						className={styles['faq-item__question-icon']}
					/>
				</div>
			</div>
			<div>
				<div
					className={`${styles['faq-item__answer-container']} ${
						isActive ? styles['faq-item__answer-container--open'] : ''
					}`}
				>
					<div className={styles['faq-item__answer-content']}>
						{item.answer}
					</div>
				</div>
			</div>
		</div>
	);
};
