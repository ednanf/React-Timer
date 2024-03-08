import './ToggleBtn.css';

export default function ToggleBtn({ onClick, active, id }) {
	return (
		<>
			<label className="switch">
				<input type="checkbox" onChange={onClick} id={id} checked={active} />
				<span className="slider round"></span>
			</label>
		</>
	);
}
