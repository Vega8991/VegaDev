import { render } from '@testing-library/react';
import { LangProvider } from '../i18n/LangContext';

export const renderEn = (ui) => render(<LangProvider lang="en">{ui}</LangProvider>);
export const renderEs = (ui) => render(<LangProvider lang="es">{ui}</LangProvider>);
