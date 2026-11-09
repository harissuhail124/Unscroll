import React, { useState } from 'react';
import { useSettings, PAKISTAN_CITIES } from '../../context/SettingsContext';
import { GeometricAccent } from '../common/GeometricAccent';
import { ThemeMode, AsrJuristicMethod } from '../../types';

interface SettingsViewProps {
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const { settings, updateSettings, clearAllData, requestGeolocation } = useSettings();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [geoStatus, setGeoStatus] = useState<string | null>(null);

  const handleCityChange = (cityName: string) => {
    const found = PAKISTAN_CITIES.find((c) => c.name === cityName);
    if (found) {
      updateSettings({
        city: found.name,
        latitude: found.latitude,
        longitude: found.longitude
      });
    }
  };

  const handleLocateMe = async () => {
    setGeoStatus('Detecting location on device...');
    const ok = await requestGeolocation();
    if (ok) {
      setGeoStatus('Updated with device GPS (never leaves your phone).');
    } else {
      setGeoStatus('Location permission denied or unavailable. Using preset city.');
    }
    setTimeout(() => setGeoStatus(null), 4000);
  };

  const handleToggleNotifications = async () => {
    if (!('Notification' in window)) {
      alert('Notifications are not supported in this browser.');
      return;
    }

    if (!settings.notificationsEnabled) {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        updateSettings({ notificationsEnabled: true });
      } else {
        alert('Notification permission was not granted.');
      }
    } else {
      updateSettings({ notificationsEnabled: false });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Settings</h2>
        <button
          onClick={onBack}
          className="btn-subtle"
          style={{ padding: '6px 12px', fontSize: '0.85rem', cursor: 'pointer' }}
        >
          Done
        </button>
      </div>

      {/* Faith Features Switch (Section 3) */}
      <section className="card">
        <GeometricAccent variant="watermark" opacity={0.04} />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>
              Faith features
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              Includes local prayer times, dhikr tasbih, daily verified Qur'an ayat, adhkar, and faith-based swap quests. Can be turned off anytime.
            </p>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', minHeight: '32px' }}>
            <input
              type="checkbox"
              checked={settings.faithFeatures}
              onChange={(e) => updateSettings({ faithFeatures: e.target.checked })}
              style={{
                width: '22px',
                height: '22px',
                accentColor: 'var(--accent-emerald)',
                cursor: 'pointer'
              }}
              aria-label="Toggle faith features"
            />
          </label>
        </div>
      </section>

      {/* Appearance / Theme (Section 4) */}
      <section className="card">
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}>
          Appearance
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {(['system', 'light', 'dark'] as ThemeMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => updateSettings({ theme: mode })}
              className={`btn ${settings.theme === mode ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 10px', fontSize: '0.82rem', textTransform: 'capitalize' }}
            >
              {mode}
            </button>
          ))}
        </div>
      </section>

      {/* Prayer & Location Calculation (Section 3) */}
      {settings.faithFeatures && (
        <section className="card">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>
            Prayer Times Calculation
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Calculation Method: Karachi (University of Islamic Sciences). Computed 100% on this phone.
          </p>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
              City (Pakistan)
            </label>
            <select
              value={PAKISTAN_CITIES.some((c) => c.name === settings.city) ? settings.city : 'custom'}
              onChange={(e) => handleCityChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.88rem'
              }}
            >
              {PAKISTAN_CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
              {!PAKISTAN_CITIES.some((c) => c.name === settings.city) && (
                <option value="custom">{settings.city}</option>
              )}
            </select>
          </div>

          <button
            onClick={handleLocateMe}
            className="btn btn-secondary"
            style={{ width: '100%', fontSize: '0.82rem', padding: '8px 12px', marginBottom: '12px' }}
          >
            Use Device Location (GPS)
          </button>
          {geoStatus && (
            <p style={{ fontSize: '0.78rem', color: 'var(--accent-teal)', marginBottom: '12px' }}>
              {geoStatus}
            </p>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
              Asr Calculation Method
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {(['Hanafi', 'Standard'] as AsrJuristicMethod[]).map((asr) => (
                <button
                  key={asr}
                  onClick={() => updateSettings({ asrMethod: asr })}
                  className={`btn ${settings.asrMethod === asr ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '8px', fontSize: '0.8rem' }}
                >
                  {asr} {asr === 'Hanafi' ? '(Pakistan common)' : '(Shafi/Maliki/Hanbali)'}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gentle Prayer Reminders */}
      {settings.faithFeatures && (
        <section className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '2px' }}>
                Prayer Reminders
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Gentle local notifications ("Time for Asr. Take a pause from your phone.")
              </p>
            </div>
            <button
              onClick={handleToggleNotifications}
              className={`btn ${settings.notificationsEnabled ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 14px', fontSize: '0.8rem' }}
            >
              {settings.notificationsEnabled ? 'Enabled' : 'Enable'}
            </button>
          </div>
        </section>
      )}

      {/* Privacy & Safety - Clear my data (Section 5) */}
      <section className="card" style={{ border: '1px solid var(--accent-sand)' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>
          Privacy & Storage
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.45 }}>
          All data is saved exclusively on this device. You can reset everything at any time.
        </p>

        {!showClearConfirm ? (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="btn btn-secondary"
            style={{ color: '#dc2626', borderColor: '#fca5a5', width: '100%', fontSize: '0.85rem' }}
          >
            Clear my data
          </button>
        ) : (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '12px' }}>
            <p style={{ fontSize: '0.82rem', color: '#991b1b', marginBottom: '10px' }}>
              Are you sure? This will delete all saved check-ins, wins, quests, and custom settings from this device.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={clearAllData}
                className="btn"
                style={{ backgroundColor: '#dc2626', color: '#fff', flex: 1, padding: '8px', fontSize: '0.82rem' }}
              >
                Yes, delete all
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '8px', fontSize: '0.82rem' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>

      <footer style={{ textAlign: 'center', padding: '12px 0 24px' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Unscroll is not a counselor or a medical service.
        </p>
      </footer>
    </div>
  );
};
