import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div></div>
			<small>
				Photo by{' '}
				<a href='https://unsplash.com/@alvannee?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>
					Alvan Nee
				</a>{' '}
				on{' '}
				<a href='https://unsplash.com/photos/white-and-brown-long-fur-cat-ZCHj_2lJP00?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>
					Unsplash
				</a>
				<a
					target='_blank'
					href='https://icons8.com/icon/36886/maneki'
				>
					&nbsp; &#x2022; Maneki
				</a>{' '}
				icon by{' '}
				<a
					target='_blank'
					href='https://icons8.com'
				>
					Icons8
				</a>
			</small>
		</>
	);
}

export default App;
