import { describe, it, expect } from 'vitest';
import {
  generateBundleManifestJson,
  generateClaudeDesktopConfig,
  generateCursorRulesMdc,
  generateCliScript
} from '../utils/exportGenerator';
import { SEED_BUNDLES } from '../data/seedData';

describe('Export Generator Tests', () => {
  const bundle = SEED_BUNDLES[0];

  it('generates valid JSON manifest', () => {
    const jsonStr = generateBundleManifestJson(bundle);
    const parsed = JSON.parse(jsonStr);
    expect(parsed.id).toBe(bundle.id);
    expect(parsed.components.length).toBe(bundle.components.length);
  });

  it('generates Claude Desktop config markdown', () => {
    const claudeStr = generateClaudeDesktopConfig(bundle);
    expect(claudeStr).toContain('CLAUDE DESKTOP WORKFLOW SKILL MANIFEST');
    expect(claudeStr).toContain(bundle.name);
  });

  it('generates Cursor MDC rules', () => {
    const mdcStr = generateCursorRulesMdc(bundle);
    expect(mdcStr).toContain('description:');
    expect(mdcStr).toContain('workflow:');
  });

  it('generates executable bash installer script', () => {
    const bashStr = generateCliScript(bundle, 'claude-desktop');
    expect(bashStr).toContain('#!/usr/bin/env bash');
    expect(bashStr).toContain('TARGET_DIR');
  });
});
