import React from 'react';
import {
	Body,
	Container,
	Head,
	Html,
	Preview,
	Section,
	Tailwind,
} from 'react-email';
import { themeConfig } from '../theme/theme';
import RobotoFonts from '../theme/theme-fonts';
import Divider from './divider';
import Logo from './logo';

interface WrapperProps {
	children: React.ReactNode;
	preview: string;
	head?: React.ReactNode;
}

const Wrapper = ({ children, preview, head }: WrapperProps) => {
	return (
		<Tailwind config={themeConfig}>
			<Html lang="en">
				<Head>
					<RobotoFonts />
					<meta
						name="format-detection"
						content="telephone=no, date=no, address=no, email=no"
					/>
					<meta name="color-scheme" content="light dark" />
					<meta name="supported-color-schemes" content="light dark" />
					<style
						dangerouslySetInnerHTML={{
							__html: `
							a[x-apple-data-detectors] {
								color: inherit !important;
								text-decoration: none !important;
								font-size: inherit !important;
								font-family: inherit !important;
								font-weight: inherit !important;
								line-height: inherit !important;
							}

							.button-hover:hover {
								opacity: 0.9 !important;
								transition: opacity 0.2s ease-in-out;
							}

							u + #body a {
								color: inherit;
								text-decoration: none;
								font-size: inherit;
								font-family: inherit;
								font-weight: inherit;
								line-height: inherit;
							}
						`,
						}}
					/>
					{head}
				</Head>
				<Body className="text-fg font-sans dark:text-fg-dark">
					<Preview>{preview}</Preview>
					<Container className="mx-auto max-w-[640px] my-6 bg-bg-2 border-2 border-stroke rounded-[16px] text-fg dark:text-fg-dark bg-bg dark:bg-bg-dark">
						<Section className="mobile:px-4 px-6 py-6 text-left">
							<Logo />
							<Divider />
							{children}
						</Section>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
};

export default Wrapper;
