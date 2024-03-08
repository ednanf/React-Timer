import { useState } from 'react';

import Timer from '../Timer/Timer';
import SettingsPanel from '../SettingsPanel/SettingsPanel';

import './Device.css';

function Device({ isDark, setDarkMode }) {
	const [panelVisible, setPanelVisible] = useState(false);
	const [isLooping, setIsLooping] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	// Event handlers
	function handleSettingsVisibility() {
		setPanelVisible(() => !panelVisible);
	}

	function handleIsLooping() {
		setIsLooping(() => !isLooping);
	}

	function handleIsEditing() {
		setIsEditing(() => !isEditing);
	}

	return (
		<div id="device-container" className={panelVisible ? 'stretch' : 'squish'}>
			<div id="main-panel">
				<div id="title-container">
					<h1>Timer</h1>
				</div>
				<div id="timer-container">
					<Timer
						showSettings={handleSettingsVisibility}
						isLooping={isLooping}
						setIsLooping={handleIsLooping}
						isEditing={isEditing}
					/>
				</div>
			</div>
			<div id="settings-panel" className={!panelVisible ? 'hidden' : ''}>
				<SettingsPanel
					panelVisible={panelVisible}
					isDark={isDark}
					setDarkMode={setDarkMode}
					isLooping={isLooping}
					setIsLooping={handleIsLooping}
					isEditing={isEditing}
					setIsEditing={handleIsEditing}
				/>
			</div>
		</div>
	);
}

export default Device;
