import { ChallengeTier } from '@/types/challenge/challengeTier.types';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { ChallengeVisibility } from '@/types/challenge/challengeVisibility.types';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@shared/ui';
import { useChallengeFilters } from '../useChallengeFilters.hook';
import styles from './ChallengesTable.module.scss';

export const ChallengesTableFilters = () => {
	const [{ tier, type, visibility }, setFilters] = useChallengeFilters();

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
				<Select
					value={visibility ?? 'ALL'}
					onValueChange={(value) =>
						setFilters((prev) => ({
							...prev,
							visibility:
								value === 'ALL' ? null : (value as ChallengeVisibility),
							page: 0,
						}))
					}
					defaultValue={undefined}
				>
					<SelectTrigger placeholder="Filter by Visibility" />
					<SelectContent>
						<SelectItem value="ALL">All challenges</SelectItem>
						{Object.entries(ChallengeVisibility).map(([key, value]) => (
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
