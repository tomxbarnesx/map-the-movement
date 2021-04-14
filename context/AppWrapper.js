import { createContext, useContext, useState } from 'react';
export const AppContext = createContext();

export function AppWrapper({ children }) {
	const [url, setUrl] = useState('https://frame.media');

	const contextValue = {
        url: url,
    };

	return (
		<AppContext.Provider value={contextValue}>
			{children}
		</AppContext.Provider>
	);
}