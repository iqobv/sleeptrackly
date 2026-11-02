import type { FC, SVGProps } from 'react';

import coin from './coin.svg';
import logo from './logo.svg';
import streak from './streak.svg';

type SvgIcon = FC<SVGProps<SVGSVGElement>>;

export const CoinIcon = coin as SvgIcon;
export const LogoIcon = logo as SvgIcon;
export const StreakIcon = streak as SvgIcon;
