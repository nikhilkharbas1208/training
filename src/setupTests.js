// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// src/setupTests.js
import { TextEncoder, TextDecoder } from 'node:util';
import React from 'react';
import {ReactDOMClient} from 'react-dom/client';
import { data } from './TestData';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}


jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key, i18n: { changeLanguage: () => Promise.resolve() } }),
}));

jest.mock('ag-grid-react', () => ({
  AgGridReact: () => <div data-testid="ag-grid-mock" />,
}));
