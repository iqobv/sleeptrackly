import Loader from '../Loader/Loader';

interface ButtonContentProps {
	children: React.ReactNode;
	loading: boolean;
}

const ButtonContent = ({ children, loading }: ButtonContentProps) => {
	return loading ? <Loader disablePadding thickness={3} size={18} /> : children;
};

export default ButtonContent;
