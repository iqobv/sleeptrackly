import { Container } from '@shared/ui';

export default function ChallengePageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Container
			style={{
				paddingBottom: '3rem',
			}}
		>
			{children}
		</Container>
	);
}
