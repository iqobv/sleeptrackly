'use client';

import { generateWeeklyChallenges } from '@/api/challenge/generateWeeklyChallenges.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { GenerateWeeklyChallengesDto } from '@/dto/challenge/challenge.dto';
import {
	Button,
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { MdOutlineMoreVert } from 'react-icons/md';
import { toast } from 'react-toastify';

export const ChallengeDropdown = () => {
	const queryClient = useQueryClient();

	const { mutate: generateChallenges, isPending } = useMutation({
		mutationFn: (data: GenerateWeeklyChallengesDto) =>
			generateWeeklyChallenges(data),
		onSuccess: () => {
			toast.success('Weekly challenges generated successfully');
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.challenge.all });
		},
		onError: (e) => {
			if (isAxiosError(e) && e.response?.data?.message) {
				toast.error(e.response.data.message);
				return;
			}

			toast.error('Failed to generate weekly challenges');
		},
	});

	const generateForCurrentWeek = () =>
		generateChallenges({ currentWeek: true });

	const generateForNextWeek = () => generateChallenges({ currentWeek: false });

	return (
		<Dropdown>
			<DropdownTrigger asChild>
				<Button isIcon variant="text">
					<MdOutlineMoreVert size={24} />
				</Button>
			</DropdownTrigger>
			<DropdownContent>
				<DropdownItem asChild>
					<Button
						variant="text"
						onClick={generateForCurrentWeek}
						loading={isPending}
					>
						Generate for current week
					</Button>
				</DropdownItem>
				<DropdownItem asChild>
					<Button
						variant="text"
						onClick={generateForNextWeek}
						loading={isPending}
					>
						Generate for next week
					</Button>
				</DropdownItem>
			</DropdownContent>
		</Dropdown>
	);
};
