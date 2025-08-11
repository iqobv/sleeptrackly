import colorLib from '@kurkle/color';

export const transparentize = (value, opacity) => {
	const alpha = opacity === undefined ? 0.5 : 1 - opacity;
	return colorLib(value).alpha(alpha).rgbString();
};
