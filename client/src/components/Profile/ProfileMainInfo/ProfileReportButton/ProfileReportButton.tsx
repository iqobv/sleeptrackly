'use client';

import ReportModal from '@/components/ReportModal/ReportModal';
import { Profile } from '@/types';

interface ProfileReportButtonProps {
	profile: Profile;
}

const ProfileReportButton = ({ profile }: ProfileReportButtonProps) => {
	return <ReportModal reportedId={profile.id} />;
};

export default ProfileReportButton;
