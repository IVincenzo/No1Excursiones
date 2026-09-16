import {afterEach, describe, expect, it} from 'vitest';
import {getActivities, getActivityByCode, getActivityLocalizedPaths} from './activities';

const originalSource = process.env.CONTENT_SOURCE;

afterEach(() => {
  if (originalSource === undefined) delete process.env.CONTENT_SOURCE;
  else process.env.CONTENT_SOURCE = originalSource;
});

describe('activity content repository', () => {
  it('uses the explicit static source with localized stable identities', async () => {
    process.env.CONTENT_SOURCE = 'static';
    expect(await getActivities('en')).toHaveLength(9);
    expect((await getActivityByCode('fr', 'boat-trips'))?.slug).toBe('sorties-en-bateau');
    expect(await getActivityLocalizedPaths('boat-trips')).toEqual({en: 'boat-trips', es: 'excursiones-en-barco', fr: 'sorties-en-bateau', de: 'bootsausfluege'});
  });

  it('rejects an unknown content source instead of falling back', async () => {
    process.env.CONTENT_SOURCE = 'unknown';
    await expect(getActivities('en')).rejects.toThrow('Unsupported CONTENT_SOURCE');
  });
});
