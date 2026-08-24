import { Container } from "@shared/ui";

export default function ChallengesPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Container>{children}</Container>;
}
