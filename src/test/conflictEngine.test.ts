import { describe, it, expect } from 'vitest';
import { analyzeBundleConflicts } from '../utils/conflictEngine';
import { SEED_SKILLS, SEED_BUNDLES } from '../data/seedData';
import { Bundle } from '../types';

describe('Conflict Engine Tests', () => {
  it('detects empty bundles', () => {
    const emptyBundle: Bundle = {
      ...SEED_BUNDLES[0],
      id: 'test-empty',
      components: []
    };

    const warnings = analyzeBundleConflicts(emptyBundle, SEED_SKILLS);
    expect(warnings.some(w => w.id === 'warn-empty-bundle')).toBe(true);
  });

  it('passes flagship bundle with zero blocking errors', () => {
    const warnings = analyzeBundleConflicts(SEED_BUNDLES[0], SEED_SKILLS);
    const errors = warnings.filter(w => w.severity === 'error');
    expect(errors.length).toBe(0);
  });

  it('flags duplicate skills in pipeline', () => {
    const dupeBundle: Bundle = {
      ...SEED_BUNDLES[0],
      components: [
        SEED_BUNDLES[0].components[0],
        SEED_BUNDLES[0].components[0]
      ]
    };

    const warnings = analyzeBundleConflicts(dupeBundle, SEED_SKILLS);
    expect(warnings.some(w => w.title.includes('Duplicate'))).toBe(true);
  });
});
