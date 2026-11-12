import React from 'react';
import { Font } from 'react-email';

const RobotoFonts = () => {
	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: `@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');`,
				}}
			/>
			<Font
				fontFamily="Roboto"
				fallbackFontFamily={['Arial', 'sans-serif']}
				webFont={{
					url: 'https://fonts.gstatic.com/s/roboto/v30/K7GfRi_5SELe96_nzP997A.woff2',
					format: 'woff2',
				}}
				fontWeight={400}
				fontStyle="normal"
			/>
			<Font
				fontFamily="Roboto"
				fallbackFontFamily={['Arial', 'sans-serif']}
				webFont={{
					url: 'https://fonts.gstatic.com/s/roboto/v30/K7GfRi_5SELe96_nzP997A.woff2',
					format: 'woff2',
				}}
				fontWeight={500}
				fontStyle="normal"
			/>
			<Font
				fontFamily="Roboto"
				fallbackFontFamily={['Arial', 'sans-serif']}
				webFont={{
					url: 'https://fonts.gstatic.com/s/roboto/v30/K7GfRi_5SELe96_nzP997A.woff2',
					format: 'woff2',
				}}
				fontWeight={600}
				fontStyle="normal"
			/>
		</>
	);
};

export default RobotoFonts;
