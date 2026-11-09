import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { WinItem } from '../../types';
import { SafeStorage, STORAGE_KEYS } from '../../services/storage';
import { recordActiveToday } from '../../services/streak';

export const WinsList: React.FC = () => {
  const { settings } = useSettings();
  const [wins, setWins] = useState<WinItem[]>(() => {
    return SafeStorage.getItem<WinItem[]>(STORAGE_KEYS.WINS, []);
  });
  const [textInput, setTextInput] = useState('');

  const isFaith = settings.faithFeatures;
  const title = isFaith ? 'Shukr (gratitude)' : 'My wins';
  const subtitle = isFaith
    ? 'Record one blessing from your day (health, study focus, a kind word, prayer).'
    : 'Private one-line entries of what went well today, big or small.';

  const handleAddWin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanText = textInput.trim();
    if (!cleanText) return;

    const newWin: WinItem = {
      id: `win-${Date.now()}`,
      timestamp: Date.now(),
      text: cleanText
    };

    const updated = [newWin, ...wins];
    setWins(updated);
    SafeStorage.setItem(STORAGE_KEYS.WINS, updated);
    setTextInput('');
    recordActiveToday();
  };

  const handleDeleteWin = (id: string) => {
    const updated = wins.filter((w) => w.id !== id);
    setWins(updated);
    SafeStorage.setItem(STORAGE_KEYS.WINS, updated);
  };

  return (
    <section className="card" style={{ padding: '18px 16px' }}>
      <div style={{ marginBottom: '12px' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--accent-emerald-text)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          Daily personal log
        </span>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '2px 0 0' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleAddWin} style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={isFaith ? 'e.g. Grateful for peace of mind after Asr' : 'e.g. Finished calculus tutorial 2'}
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: '0.88rem'
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '10px 16px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
          >
            Add
          </button>
        </div>
      </form>

      {/* List of Wins */}
      {wins.length === 0 ? (
        <div
          style={{
            padding: '14px',
            textAlign: 'center',
            backgroundColor: 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-muted)',
            fontSize: '0.82rem'
          }}
        >
          No entries yet. Write one small line above to start acknowledging your progress.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {wins.map((win) => (
            <div
              key={win.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem'
              }}
            >
              <div style={{ flex: 1, marginRight: '10px' }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                  {win.text}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {new Date(win.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </div>
              </div>
              <button
                onClick={() => handleDeleteWin(win.id)}
                className="btn-subtle"
                style={{ padding: '4px 8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}
                aria-label={`Delete entry: ${win.text}`}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
