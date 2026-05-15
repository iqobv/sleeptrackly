import { User } from '../user/user.types';
import { UserSanction } from '../user/userSanction.types';
import { ReportStatus } from './reportStatus.types';
import { ReportType } from './reportType.types';

export interface Report {
	id: string;
	title: string;
	description: string;
	reporterId: string;
	targetUserId: string;
	reviewedById: string | null;
	response: string | null;
	reportType: ReportType;
	status: ReportStatus;
	createdAt: Date;
	updatedAt: Date;
}

export interface ReportFull extends Report {
	reporter: User;
	targetUser: User | null;
	reviewedBy: User | null;
	sanctions: UserSanction[];
}
