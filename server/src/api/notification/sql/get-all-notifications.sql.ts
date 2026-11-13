import { Prisma } from '@generated/prisma/client';
import { Sql } from '@prisma/client/runtime/client';

export const getNotificationsForUserSql = (
	userId: string,
	limit: number,
	offset: number,
	lang: string = 'en',
): Sql => Prisma.sql`
	SELECT
		n.id,
		n.user_id                 AS "userId",
		n.weekly_sleep_summary_id AS "weeklySleepSummaryId",
		n.achievement_id          AS "achievementId",
		n.challenge_id            AS "challengeId",
		n.sanction_id             AS "sanctionId",
		n.type,
		n.is_global               AS "isGlobal",
		n.is_push                 AS "isPush",
		n.show_in_app             AS "showInApp",
		n.is_scheduled            AS "isScheduled",
		n.is_email                AS "isEmail",
		n.title,
		n.body,
		n.redirect_url            AS "redirectUrl",
		n.meta
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
		END AS "isRead",

		CASE
			WHEN s.id IS NOT NULL THEN
				json_build_object(
					'id', s.id,
					'type', s.type,
					'endsAt', s.ends_at,
					'reportId', s.report_id
				)
			ELSE NULL
		END AS "sanction",

		CASE
			WHEN c.id IS NOT NULL THEN
				json_build_object(
					'id', c.id,
					'translations', (
						SELECT json_agg(json_build_object('language', ct.language, 'title', ct.title))
						FROM challenge_translations ct
						WHERE ct.challenge_id = c.id
					)
				)
			ELSE NULL
		END AS "challenge",

	FROM notifications n
	INNER JOIN users u
		ON u.id = ${userId}
	LEFT JOIN user_sanctions s
    ON n.sanction_id = s.id

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
