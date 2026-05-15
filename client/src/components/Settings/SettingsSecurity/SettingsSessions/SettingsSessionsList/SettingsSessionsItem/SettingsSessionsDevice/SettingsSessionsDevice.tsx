'use client';

import { IconBaseProps } from 'react-icons';
import { MdOutlineDesktopWindows, MdOutlineSmartphone } from 'react-icons/md';
import styles from './SettingsSessionsDevice.module.scss';

interface SettingsSessionsDeviceProps {
	deviceType: string;
}

const iconProps: IconBaseProps = {
	size: 30,
	fill: 'var(--device-color)',
};

const SettingsSessionsDevice = ({
	deviceType,
}: SettingsSessionsDeviceProps) => {
	return (
		<div className={styles.device}>
			{deviceType === 'mobile' ? (
				<MdOutlineSmartphone {...iconProps} />
			) : (
				<MdOutlineDesktopWindows {...iconProps} />
			)}
		</div>
	);
};

export default SettingsSessionsDevice;
