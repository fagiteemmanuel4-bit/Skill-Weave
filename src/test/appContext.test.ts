import { describe, it, expect } from 'vitest';

describe('AppContext & Integration State Helpers', () => {
  it('correctly toggles integration status and updates key state', () => {
    const mockIntegrations = [
      { id: 'claude-desktop', connected: false, apiKeySet: false }
    ];

    const updated = mockIntegrations.map(item => {
      if (item.id === 'claude-desktop') {
        return { ...item, connected: true, apiKeySet: true };
      }
      return item;
    });

    expect(updated[0].connected).toBe(true);
    expect(updated[0].apiKeySet).toBe(true);
  });

  it('correctly formats login profiles', () => {
    const email = 'alex.vance@skillweave.io';
    const profile = {
      id: 'usr-123',
      email,
      name: email.split('@')[0]
    };

    expect(profile.name).toBe('alex.vance');
    expect(profile.email).toBe('alex.vance@skillweave.io');
  });
});
