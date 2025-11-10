import { IUser } from '../user/user.types';
import { IUserSanction } from '../user/userSanction.types';
import { TReportStatus } from './reportStatus.types';
import { TReportType } from './reportType.types';

export interface IReport {
	id: string;
	title: string;
	description: string;
	reporterId: string;
	targetUserId: string;
	reviewedById: string | null;
	response: string | null;
	reportType: TReportType;
	status: TReportStatus;
	createdAt: Date;
	updatedAt: Date;
}

export interface IReportFull extends IReport {
	reporter: IUser;
	targetUser: IUser | null;
	reviewedBy: IUser | null;
	sanctions: IUserSanction[];
}
