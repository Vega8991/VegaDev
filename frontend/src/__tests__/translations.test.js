import { describe, it, expect } from 'vitest';
import { TRANSLATIONS } from '../i18n/translations';

// Collects every dot-separated key path in an object, skipping arrays
function collectKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) => {
    const path = prefix ? `${prefix}.${k}` : k;
    return typeof v === 'object' && v !== null && !Array.isArray(v)
      ? collectKeys(v, path)
      : [path];
  });
}

describe('TRANSLATIONS', () => {
  it('has en and es locales', () => {
    expect(TRANSLATIONS).toHaveProperty('en');
    expect(TRANSLATIONS).toHaveProperty('es');
  });

  it('en and es have identical key structure', () => {
    const enKeys = collectKeys(TRANSLATIONS.en).sort();
    const esKeys = collectKeys(TRANSLATIONS.es).sort();
    expect(enKeys).toEqual(esKeys);
  });

  it('critical fields are non-empty strings', () => {
    const critical = [
      'nav.brand', 'nav.menu', 'nav.close',
      'home.availability', 'home.titleA', 'home.titleB',
      'footer.copyright', 'footer.tagline',
      'contact.sectionTitle', 'contact.sendMessage',
    ];
    critical.forEach((path) => {
      const get = (obj, p) => p.split('.').reduce((o, k) => o?.[k], obj);
      const en = get(TRANSLATIONS.en, path);
      const es = get(TRANSLATIONS.es, path);
      expect(en, `en.${path} is empty`).toBeTruthy();
      expect(es, `es.${path} is empty`).toBeTruthy();
    });
  });

  it('nav.links has entries for all 5 routes', () => {
    const routeIds = ['', 'work', 'path', 'stack', 'contact'];
    routeIds.forEach((id) => {
      expect(TRANSLATIONS.en.nav.links).toHaveProperty(id);
      expect(TRANSLATIONS.es.nav.links).toHaveProperty(id);
    });
  });

  it('contact.errors has all 5 error keys', () => {
    const keys = ['nameMissing', 'emailMissing', 'emailBroken', 'messageMissing', 'messageShort'];
    keys.forEach((k) => {
      expect(TRANSLATIONS.en.contact.errors).toHaveProperty(k);
      expect(TRANSLATIONS.es.contact.errors).toHaveProperty(k);
    });
  });
});
