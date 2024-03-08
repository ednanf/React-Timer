import { useState, useEffect } from 'react';

import Button from '../Button/Button';
import ToggleBtn from '../ToggleBtn/ToggleBtn';

import './SettingsPanel.css';

function SettingsPanel({
	panelVisible,
	isDark,
	setDarkMode,
	setIsLooping,
	isLooping,
	setIsEditing,
	isEditing,
}) {
	const [notificationPermission, setNotificationPermission] =
		useState('Authorize');

	// Notifications
	function askNotificationPermission() {
		Notification.requestPermission().then(() => checkCurrentPermission());
	}

	// Monitor changes in permissions
	useEffect(() => {
		checkCurrentPermission();
	}, [notificationPermission]);

	// Checks current permission status on browser and sets accordingly
	function checkCurrentPermission() {
		switch (Notification.permission) {
			case 'default':
				setNotificationPermission('Authorize');
				break;
			case 'granted':
				setNotificationPermission('ON');
				break;
			case 'denied':
				setNotificationPermission('DENIED');
				break;
			default:
				break;
		}
	}

	// Controls wether the toggle is active or not when reloading
	function darkModeToggleStatus() {
		if (isDark) {
			return true;
		} else {
			return false;
		}
	}

	// Controls wether the toggle is active or not when reloading
	function loopToggleStatus() {
		if (isLooping) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<div
			id="settings-container"
			className={panelVisible ? 'fade-in' : 'fade-out'}
		>
			<div id="settings-header">
				<h3>SETTINGS</h3>
			</div>
			<div id="settings-options">
				<ul>
					<li>
						<p>Custom Time</p>
						<Button
							shape="pill"
							onClick={setIsEditing}
							active={isEditing ? 'active-light' : ''}
						>
							{isEditing ? 'Confirm' : 'Edit'}
						</Button>
					</li>
					<li>
						<p>Loop</p>
						<ToggleBtn
							onClick={setIsLooping}
							active={loopToggleStatus()}
							id={'loop'}
						/>
					</li>
					<li>
						<p>Dark Mode</p>
						<ToggleBtn
							onClick={setDarkMode}
							active={darkModeToggleStatus()}
							id={'dark-mode'}
						/>
					</li>
					<li>
						<p>Notifications</p>
						<Button
							shape="pill"
							onClick={askNotificationPermission}
							isDisabled={
								notificationPermission !== 'Authorize'
									? 'disabled-notification'
									: ''
							}
						>
							{notificationPermission}
						</Button>
					</li>
				</ul>
			</div>
			<div id="settings-footer">
				<ul>
					<li>
						<a href="#">GitHub</a>
					</li>
					<li>
						<a href="#">About</a>
					</li>
					<li>
						<a href="#">Help</a>
					</li>
				</ul>
				<p>Created by Ednan</p>
			</div>
		</div>
	);
}

export default SettingsPanel;
