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
		n.is_important						AS "isImportant",
		n.title,
		n.body,
		n.redirect_url            AS "redirectUrl",
		n.meta,
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
			WHEN n.challenge_id IS NOT NULL THEN
				json_build_object(
					'id', n.challenge_id,
					'translation', (
						SELECT json_build_object(
							'title', ct.title,
							'language', ct.language,
							'description', ct.description
						)
					FROM challenge_translations ct
					WHERE ct.challenge_id = n.challenge_id
						AND ct.language = ${lang}
					LIMIT 1
					)
				)
			ELSE NULL
		END AS "challenge",

		CASE
			WHEN f.id IS NOT NULL THEN
				json_build_object(
					'id', f.id,
					'username', f_req.username
				)
			ELSE NULL
		END AS "friendship",

		CASE
			WHEN st.id IS NOT NULL THEN
				json_build_object(
					'id', st.id,
					'length', st.length
				)
			ELSE NULL
		END AS "streak",

		CASE
			WHEN n.achievement_id IS NOT NULL THEN
				json_build_object(
					'id', n.achievement_id,
					'translation', (
						SELECT json_build_object(
							'title', at.title,
							'language', at.language,
							'description', at.description
						)
					FROM achievement_translations at
					WHERE at.achievement_id = n.achievement_id
						AND at.language = ${lang}
					LIMIT 1
					)
				)
			ELSE NULL
		END AS "achievement"

	FROM notifications n
	INNER JOIN users u
		ON u.id = ${userId}
	LEFT JOIN user_sanctions s
    ON n.sanction_id = s.id
	LEFT JOIN friendships f
		ON n.friendship_id = f.id
	LEFT JOIN users f_req
    ON f.requester_id = f_req.id
	LEFT JOIN streaks st
		ON n.streak_id = st.id

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
		n.is_important DESC,
		n.created_at DESC
	LIMIT ${limit}
	OFFSET ${offset};
`;
