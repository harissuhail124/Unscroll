import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { SafeStorage, STORAGE_KEYS } from '../../services/storage';
import { WindDownState } from '../../types';

export const WindDownChecklist: React.FC = () => {
  const { settings } = useSettings();
  const todayStr = new Date().toISOString().split('T')[0];

  const defaultState: WindDownState = {
    phoneAway: false,
    tomorrowTask: '',
    slowBreathing: false,
    eveningAdhkar: false,
    istighfar: false,
    dateStr: todayStr
  };

  const [state, setState] = useState<WindDownState>(() => {
    const saved = SafeStorage.getItem<WindDownState>(STORAGE_KEYS.WIND_DOWN, defaultState);
    if (saved.dateStr !== todayStr) {
      return { ...defaultState, dateStr: todayStr };
    }
    return saved;
  });

  const [isTaskEditing, setIsTaskEditing] = useState(false);
  const [taskInput, setTaskInput] = useState(state.tomorrowTask);

  useEffect(() => {
    SafeStorage.setItem(STORAGE_KEYS.WIND_DOWN, state);
  }, [state]);

  const handleToggle = (key: keyof Omit<WindDownState, 'tomorrowTask' | 'dateStr'>) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, tomorrowTask: taskInput.trim() }));
    setIsTaskEditing(false);
  };

  const completedCount =
    (state.phoneAway ? 1 : 0) +
    (state.tomorrowTask ? 1 : 0) +
    (state.slowBreathing ? 1 : 0) +
    (settings.faithFeatures && state.eveningAdhkar ? 1 : 0) +
    (settings.faithFeatures && state.istighfar ? 1 : 0);

  const totalCount = settings.faithFeatures ? 5 : 3;

  return (
    <section className="card" style={{ marginTop: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
            Night wind-down checklist
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Protect your sleep and wake up with energy
          </p>
        </div>
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: completedCount === totalCount ? 'var(--accent-emerald)' : 'var(--bg-card-subtle)',
            color: completedCount === totalCount ? '#ffffff' : 'var(--text-muted)'
          }}
        >
          {completedCount} / {totalCount} done
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
        {/* Item 1: Phone away */}
        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '10px 12px',
            backgroundColor: state.phoneAway ? 'var(--accent-emerald-subtle)' : 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
        >
          <input
            type="checkbox"
            checked={state.phoneAway}
            onChange={() => handleToggle('phoneAway')}
            style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: 'var(--accent-emerald)' }}
          />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Phone charging away from bed
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Avoid late-night blue light and endless scrolling under the pillow.
            </div>
          </div>
        </label>

        {/* Item 2: Tomorrow's Task */}
        <div
          style={{
            padding: '10px 12px',
            backgroundColor: state.tomorrowTask ? 'var(--accent-emerald-subtle)' : 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <input
              type="checkbox"
              checked={!!state.tomorrowTask}
              readOnly
              style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: 'var(--accent-emerald)' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Pick one task for tomorrow
              </div>
              {state.tomorrowTask && !isTaskEditing ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--accent-emerald-text)', fontStyle: 'italic' }}>
                    "{state.tomorrowTask}"
                  </span>
                  <button
                    onClick={() => { setTaskInput(state.tomorrowTask); setIsTaskEditing(true); }}
                    className="btn-subtle"
                    style={{ fontSize: '0.75rem', padding: '2px 6px' }}
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveTask} style={{ marginTop: '6px' }}>
                  <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="e.g. Review calculus lecture 4 or submit assignment"
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-primary)',
                      fontSize: '0.82rem',
                      marginBottom: '6px'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button type="submit" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                      Save Task
                    </button>
                    {isTaskEditing && (
                      <button
                        type="button"
                        onClick={() => setIsTaskEditing(false)}
                        className="btn-subtle"
                        style={{ padding: '4px 8px', fontSize: '0.78rem' }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Item 3: 1 min slow breathing */}
        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '10px 12px',
            backgroundColor: state.slowBreathing ? 'var(--accent-emerald-subtle)' : 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer'
          }}
        >
          <input
            type="checkbox"
            checked={state.slowBreathing}
            onChange={() => handleToggle('slowBreathing')}
            style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: 'var(--accent-emerald)' }}
          />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              One minute of slow breathing
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Calm your nervous system before sleeping.
            </div>
          </div>
        </label>

        {/* Faith Option: Evening Adhkar & Istighfar */}
        {settings.faithFeatures && (
          <>
            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '10px 12px',
                backgroundColor: state.eveningAdhkar ? 'var(--accent-emerald-subtle)' : 'var(--bg-card-subtle)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}
            >
              <input
                type="checkbox"
                checked={state.eveningAdhkar}
                onChange={() => handleToggle('eveningAdhkar')}
                style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: 'var(--accent-emerald)' }}
              />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Evening adhkar before sleep
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Recite Ayat al-Kursi and the 3 Quls for nighttime peace.
                </div>
              </div>
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '10px 12px',
                backgroundColor: state.istighfar ? 'var(--accent-emerald-subtle)' : 'var(--bg-card-subtle)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}
            >
              <input
                type="checkbox"
                checked={state.istighfar}
                onChange={() => handleToggle('istighfar')}
                style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: 'var(--accent-emerald)' }}
              />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Istighfar (seeking forgiveness)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Say "Astaghfirullah wa atoobu ilayh" with a sincere heart.
                </div>
              </div>
            </label>
          </>
        )}
      </div>
    </section>
  );
};
