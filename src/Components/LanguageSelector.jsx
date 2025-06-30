
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <select
            onChange={changeLanguage}
            value={i18n.language}
            style={{
                position: 'absolute',
                top: '10px',
                right: '60px',
                padding: '6px 10px',
                borderRadius: '4px',
                backgroundColor: '#398cef',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                maxWidth: '120px',
                border: '1px solid #ccc',
                appearance: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                zIndex: 1000,
            }}
        >
            <option value="en">English</option>
            <option value="mr">मराठी</option>
            <option value="hi">हिंदी</option>
            <option value="fr">Français</option>
        </select>
    );
};

export default LanguageSelector;
