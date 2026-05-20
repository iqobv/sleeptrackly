import { Prisma } from '@generated/prisma/client';

export const getNotificationsForUserSql = (
	userId: string,
	limit: number,
	offset: number,
) => Prisma.sql`
	SELECT
		n.id,
		n.user_id                 AS "userId",
		n.weekly_sleep_summary_id AS "weeklySleepSummaryId",
		n.type,
		n.is_global               AS "isGlobal",
		n.is_push                 AS "isPush",
		n.show_in_app             AS "showInApp",
		n.is_scheduled            AS "isScheduled",
		n.is_email                AS "isEmail",
		n.title,
		n.body,
		n.redirect_url            AS "redirectUrl",
		n.scheduled_at            AS "scheduledAt",
		n.created_at              AS "createdAt",
		n.updated_at              AS "updatedAt",
		CASE
			WHEN n.is_global = true THEN
				EXISTS (
					SELECT 1
					FROM global_notification_read gnr
					WHERE gnr.notification_id = n.id
					  AND gnr.user_id = ${userId}
				)
			ELSE n.is_read
		END AS "isRead"
	FROM notifications n
	INNER JOIN users u
		ON u.id = ${userId}
	WHERE
		n.show_in_app = true
		AND n.is_push = false
		AND n.is_scheduled = false
		AND n.is_email = false
		AND (
			(n.is_global = false AND n.user_id = ${userId})

			OR (
				n.is_global = true
				AND n.created_at >= u.created_at
			)
		)
	ORDER BY
		"isRead" ASC,
		n.created_at DESC
	LIMIT ${limit}
	OFFSET ${offset};
`;
