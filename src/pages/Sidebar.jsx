import React, { useState, useContext } from 'react'

export const ThemeContext = React.createContext()

function ThemeButton() {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <button type="button" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
    )
}

export function Sidebar({ children }) {

    const [theme, setTheme] = useState('light')


    const toggleTheme = () => {
        console.log(children);
        setTheme((current) => (current === 'light' ? 'dark' : 'light'))
    }

   // console.log(children);

    return (
        <>

            <div>
                <aside className="w-64 bg-gray-900 p-4 rounded-lg"> Sidebar
                    <ThemeContext.Provider value={{ theme, toggleTheme }}>
                        <div>
                            <ThemeButton />
                        </div>
                    </ThemeContext.Provider>
                </aside>
                <ThemeContext.Provider value={{ theme, toggleTheme }}>
                    <div className="main-content">
                        {children}
                    </div>
                </ThemeContext.Provider>
            </div>

        </>
    );
}