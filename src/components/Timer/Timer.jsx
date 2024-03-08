import { useState, useEffect } from 'react';

import TimerDisplay from '../TimerDisplay/TimerDisplay';
import Button from '../Button/Button';

import { LuRepeat } from 'react-icons/lu';
import { IoIosCog } from 'react-icons/io';
import './Timer.css';

function Timer({ showSettings, isLooping, setIsLooping, isEditing }) {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(2);
	const [isRunning, setIsRunning] = useState(null);

	// HACK: This hook is needed to ensure activities will resume when looping is on.
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		let interval;

		if (!isRunning && isLooping && !isPaused) {
			setIsRunning(true);
		}

		if (isEditing) {
			setIsRunning(false);
		}

		return timerLogic(interval);
	}, [hours, minutes, seconds, isRunning]);

	// Timer logic
	function timerLogic(interval) {
		if (isRunning) {
			interval = setInterval(() => {
				if (seconds > 0) {
					setSeconds((seconds) => seconds - 1);
				} else if (minutes > 0) {
					setMinutes((minutes) => minutes - 1);
					setSeconds(59);
				} else if (hours > 0) {
					setHours((hours) => hours - 1);
					setMinutes(59);
					setSeconds(59);
				}
			}, 1000);
		}

		if (hours === 0 && minutes === 0 && seconds === 0) {
			createNotification();
			resetTimer();
		}

		return () => clearInterval(interval);
	}

	// Timer control
	function startTimer() {
		if (hours !== 0 || minutes !== 0 || seconds !== 0) {
			setIsRunning(true);
		}

		// ensures pause will work when loop is on
		if (isPaused) {
			setIsPaused(false);
		}
	}

	function pauseTimer() {
		setIsPaused(true);
		setIsRunning(false);
	}

	// TODO: make reset timer respect what the user set when customizing
	/* maybe set a useRef with the value, along with useState so this function
	can get back that value
	I think this can work in the event handles as the time is set there */
	function resetTimer() {
		setIsRunning(false);
		setIsPaused(false);
		setHours(0);
		setMinutes(0);
		setSeconds(2);
	}

	function resetTimerBtn() {
		if (isLooping) {
			setIsLooping(false);
		}
		resetTimer();
	}

	// Notification
	// TODO: add favicon to the notification
	function createNotification() {
		const img = ``;
		const text = ``;
		const notification = new Notification(`Time's up!`, {
			body: text,
			icon: img,
		});

		return notification;
	}

	// Event handlers
	function changeHours(e) {
		setHours(e.target.value);
	}

	function changeMinutes(e) {
		setMinutes(e.target.value);
	}

	function changeSeconds(e) {
		setSeconds(e.target.value);
	}

	return (
		<>
			<div id="timer-body">
				<div id="timer">
					<TimerDisplay
						hours={hours}
						minutes={minutes}
						seconds={seconds}
						changeHours={changeHours}
						changeMinutes={changeMinutes}
						changeSeconds={changeSeconds}
						isEditing={isEditing}
					/>
				</div>
				<div id="indicator">
					<LuRepeat className={isLooping ? 'active' : ''} />
				</div>
				<div id="controls">
					<ul>
						<li>
							<Button onClick={resetTimerBtn}>RESET</Button>
						</li>
						<li>
							<Button size="big" onClick={isRunning ? pauseTimer : startTimer}>
								{isRunning ? 'PAUSE' : 'START'}
							</Button>
						</li>
						<li>
							<Button
								onClick={showSettings}
								isDisabled={isEditing ? 'disabled' : ''}
							>
								<span className="button-icon">
									<IoIosCog />
								</span>
							</Button>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default Timer;
