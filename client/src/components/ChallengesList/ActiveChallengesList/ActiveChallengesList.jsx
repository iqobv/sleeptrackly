import ChallengesListItem from '../ChallengesListItem/ChallengesListItem';

const ActiveChallengesList = ({ data }) => {
	return (
		<>
			{data?.map((el) => (
				<ChallengesListItem data={el} key={el._id} />
			))}
		</>
	);
};

export default ActiveChallengesList;
