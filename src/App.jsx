import useLocalStorage from 'use-local-storage';

import Device from './components/Device/Device';

import './App.css';

// TODO: add a starting animation to make the app appear
function App() {
	const [isDark, setIsDark] = useLocalStorage('isDark', false);

	function handleIsDark() {
		setIsDark(() => !isDark);
	}

	return (
		<div className="App" data-theme={!isDark ? 'light' : 'dark'}>
			<Device isDark={isDark} setDarkMode={handleIsDark} />
		</div>
	);
}

export default App;
