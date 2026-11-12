import React from 'react';
import { Column, Heading, Img, Row, Section } from 'react-email';

const Logo = () => {
	const logoUrl = 'https://cdn.sleeptrackly.com/icon.png';

	return (
		<Section className="py-1 w-full">
			<Row>
				<Column align="left">
					<table
						align="left"
						border={0}
						cellPadding="0"
						cellSpacing="0"
						role="presentation"
					>
						<tbody>
							<tr>
								<td>
									<Img
										src={logoUrl}
										alt="Sleeptrackly Logo"
										width={64}
										height={64}
										className="block rounded-[16px] mobile:w-[32px] mobile:h-[32px]"
									/>
								</td>
								<td className="pl-3 align-middle">
									<Heading className="text-fg dark:text-fg-dark text-3xl font-bold m-0 p-0 leading-8 text-left mobile:text-2xl">
										Sleeptrackly
									</Heading>
								</td>
							</tr>
						</tbody>
					</table>
				</Column>
			</Row>
		</Section>
	);
};

export default Logo;
