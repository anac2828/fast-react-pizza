/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: 'Roboto Mono, mono',
		},
		extend: {
			height: { screen: '100dvh' },
		},
	},
	plugins: [],
};
