import React, { useEffect, useState } from 'react';

const WithTheme = (WrappedComponent) => {
  return function ThemedComponent(props) {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(theme);
    }, [theme]);

    const handleTheme = () => {
      setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={handleTheme}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '6px 12px',
            backgroundColor: '#398cef',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            zIndex: 1000
          }}
        >
          {theme === 'light' ? '🌙' : '🌞'}
        </button>
        <WrappedComponent {...props} theme={theme} />
      </div>
    );
  };
};

export default WithTheme;
