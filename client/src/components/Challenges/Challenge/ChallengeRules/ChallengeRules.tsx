'use client';

import { ChallengeFull } from '@/types/challenge/challenge.types';
import { Typography } from '@shared/ui';
import { ChallengeCardContainer } from '../ChallengeCardContainer/ChallengeCardContainer';
import styles from './ChallengeRules.module.scss';
import { getChallengeRules } from './getChallengeRules';

interface ChallengeRulesProps {
	challenge: ChallengeFull;
}

export const ChallengeRules = ({ challenge }: ChallengeRulesProps) => {
	return (
		<ChallengeCardContainer
			className={styles.rules}
			gap={5}
			title="Rules and Requirements"
		>
			<ul className={styles.list}>
				{getChallengeRules(challenge).rules.map((rule, index) => (
					<Typography key={index} as="li">
						{rule}
					</Typography>
				))}
			</ul>
		</ChallengeCardContainer>
	);
};
