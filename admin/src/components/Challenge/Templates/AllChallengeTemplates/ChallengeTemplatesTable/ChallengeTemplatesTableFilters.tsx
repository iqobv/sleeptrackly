import { ChallengeTier } from '@/types/challenge/challengeTier.types';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@shared/ui';
import { useChallengeTemplatesFilters } from '../useChallengeTemplatesFilters.hook';
import styles from './ChallengeTemplatesTable.module.scss';

export const ChallengeTemplatesTableFilters = () => {
	const [{ tier, type }, setFilters] = useChallengeTemplatesFilters();

	return (
		<div className={styles.wrapper}>
			<div className={styles.filters}>
				<Select
					value={type ?? 'ALL'}
					onValueChange={(value) =>
						setFilters((prev) => ({
							...prev,
							type: value === 'ALL' ? null : (value as ChallengeType),
							page: 0,
						}))
					}
					defaultValue={undefined}
				>
					<SelectTrigger placeholder="Filter by Type" />
					<SelectContent>
						<SelectItem value="ALL">All types</SelectItem>
						{Object.entries(ChallengeType).map(([key, value]) => (
							<SelectItem key={key} value={value}>
								{value}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select
					value={tier ?? 'ALL'}
					onValueChange={(value) =>
						setFilters((prev) => ({
							...prev,
							tier: value === 'ALL' ? null : (value as ChallengeTier),
							page: 0,
						}))
					}
					defaultValue={undefined}
				>
					<SelectTrigger placeholder="Filter by Tier" />
					<SelectContent>
						<SelectItem value="ALL">All tiers</SelectItem>
						{Object.entries(ChallengeTier).map(([key, value]) => (
							<SelectItem key={key} value={value}>
								{value}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};
