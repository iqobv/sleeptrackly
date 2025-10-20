export interface IFaqQuestion {
	question: string;
	answer: string;
}

export const FAQ_QUESTIONS: IFaqQuestion[] = [
	{
		question: 'Is this app free to use?',
		answer:
			'Yes, this app is free to use. There are no hidden fees or subscriptions. All features are available for free use.',
	},
	{
		question:
			'How does the sleep tracker work? Do I need to start and stop it manually?',
		answer:
			'You start and stop the timer to accurately record your rest time. The sleep tracker works manually.',
	},
	{
		question: 'How are my sleep statistics presented?',
		answer:
			'Your sleep statistics are conveniently grouped by week. You can see a visual graph of your sleep patterns, along with key metrics like your weekly total and daily average sleep duration. This helps you easily track your progress and identify trends over time.',
	},
	{
		question: 'Can I share my sleep statistics with others?',
		answer:
			"No, this app is a private platform. You can't share your sleep statistics with others. However, you can add friends to see their real-time sleep status. Know who's currently tracking their sleep.",
	},
];
