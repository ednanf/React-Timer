import './Button.css';

function Button({
	onClick,
	size = '',
	shape = '',
	isDisabled,
	isOn,
	children,
	active,
}) {
	return (
		<button
			className={`${size} ${shape} ${isDisabled} ${active}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
