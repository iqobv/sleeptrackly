import { useEffect, useState } from 'react';

import ChangelogViewSection from './ChangelogViewSection/ChangelogViewSection';

const ChangelogView = ({ data }) => {
	const [content, setContent] = useState({});

	useEffect(() => {
		if (data) {
			setContent(data?.content);
		}
	}, [data]);

	return (
		<div>
			{content &&
				Object.entries(content).map(([section, value]) => (
					<ChangelogViewSection key={section} data={value} section={section} />
				))}
		</div>
	);
};

export default ChangelogView;
