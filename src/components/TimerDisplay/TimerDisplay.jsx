import './TimerDisplay.css';

function TimerDisplay({
	hours,
	minutes,
	seconds,
	changeHours,
	changeMinutes,
	changeSeconds,
	isEditing,
}) {
	return (
		<div id="timer">
			<input
				name="hours"
				value={('00' + hours).slice(-2)}
				onChange={changeHours}
				type={isEditing ? 'number' : 'text'}
				className={isEditing ? 'editable' : ''}
				min={0}
				max={99}
			/>
			<input
				name="minutes"
				value={('00' + minutes).slice(-2)}
				onChange={changeMinutes}
				type={isEditing ? 'number' : 'text'}
				className={isEditing ? 'editable' : ''}
				min={0}
				max={59}
			/>
			<input
				name="seconds"
				value={('00' + seconds).slice(-2)}
				onChange={changeSeconds}
				type={isEditing ? 'number' : 'text'}
				className={isEditing ? 'editable' : ''}
				min={0}
				max={59}
			/>
		</div>
	);
}

export default TimerDisplay;
