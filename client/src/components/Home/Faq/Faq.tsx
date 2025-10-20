'use client';

import { List, SectionHeader } from '@/components/UI';
import { useState } from 'react';
import FaqQuestion from './FaqQuestion/FaqQuestion';
import { FAQ_QUESTIONS } from './faqQuestions';

const Faq = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);

	const handleClick = (index: number) => {
		if (isOpen && activeIndex === index) {
			setIsOpen(false);
			return;
		}

		setIsOpen(true);
		setActiveIndex(index);
	};

	return (
		<div className="container">
			<SectionHeader title="Frequently Asked Questions" />
			<List
				items={FAQ_QUESTIONS}
				renderItem={(item, index) => (
					<FaqQuestion
						key={item.question}
						item={item}
						activeIndex={activeIndex}
						isOpen={isOpen}
						index={index}
						handleClick={handleClick}
					/>
				)}
			/>
		</div>
	);
};

export default Faq;
