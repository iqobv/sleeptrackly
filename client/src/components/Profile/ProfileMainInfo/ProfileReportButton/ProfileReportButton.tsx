'use client';

import { ReportModal } from '@/components/ReportModal/ReportModal';
import { Profile } from '@/types/profile/profile.types';

interface ProfileReportButtonProps {
	profile: Profile;
}

export const ProfileReportButton = ({ profile }: ProfileReportButtonProps) => {
	return <ReportModal reportedId={profile.id} />;
};
