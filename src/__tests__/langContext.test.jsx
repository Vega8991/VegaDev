import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { LangProvider, useT } from '../i18n/LangContext';
import { TRANSLATIONS } from '../i18n/translations';

const wrapEn = ({ children }) => <LangProvider lang="en">{children}</LangProvider>;
const wrapEs = ({ children }) => <LangProvider lang="es">{children}</LangProvider>;

describe('useT', () => {
  it('returns en translations when lang is en', () => {
    const { result } = renderHook(() => useT(), { wrapper: wrapEn });
    expect(result.current.lang).toBe('en');
    expect(result.current.t).toEqual(TRANSLATIONS.en);
  });

  it('returns es translations when lang is es', () => {
    const { result } = renderHook(() => useT(), { wrapper: wrapEs });
    expect(result.current.lang).toBe('es');
    expect(result.current.t).toEqual(TRANSLATIONS.es);
  });

  it('falls back to en for unknown lang', () => {
    const wrap = ({ children }) => <LangProvider lang="fr">{children}</LangProvider>;
    const { result } = renderHook(() => useT(), { wrapper: wrap });
    expect(result.current.t).toEqual(TRANSLATIONS.en);
  });

  it('sets document lang attribute', () => {
    renderHook(() => useT(), { wrapper: wrapEs });
    expect(document.documentElement.getAttribute('lang')).toBe('es');
  });
});
