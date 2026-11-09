import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { SafeStorage, STORAGE_KEYS } from '../../services/storage';
import { recordActiveToday, toLocalDateString } from '../../services/streak';

interface QuestItem {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  isFaith?: boolean;
}

const BASE_QUESTS: QuestItem[] = [
  {
    id: 'quest-move',
    title: 'Move 10 minutes',
    description: 'Walk around campus, stretch, or do light exercise without your phone.',
    durationMinutes: 10
  },
  {
    id: 'quest-learn',
    title: 'Learn 10 minutes',
    description: 'Read 2 pages of a book, review class notes, or ask an AI tutor 1 concept.',
    durationMinutes: 10
  },
  {
    id: 'quest-talk',
    title: 'Talk to one person face to face',
    description: 'A genuine in-person chat with a friend, roommate, sibling, or professor.',
    durationMinutes: 5
  }
];

const FAITH_QUESTS: QuestItem[] = [
  {
    id: 'quest-pray',
    title: 'Pray on time',
    description: 'Offer at least one prayer in congregation or at its earliest time.',
    durationMinutes: 10,
    isFaith: true
  },
  {
    id: 'quest-quran',
    title: 'Read a page of the Qur\'an',
    description: 'Read one page with Arabic and reflection on the translation.',
    durationMinutes: 5,
    isFaith: true
  },
  {
    id: 'quest-adhkar',
    title: 'Morning or evening adhkar',
    description: 'Recite the short sunnah remembrances for protection and gratitude.',
    durationMinutes: 5,
    isFaith: true
  }
];

interface DailyQuestsProps {
  onActivityRecorded: () => void;
}

export const DailyQuests: React.FC<DailyQuestsProps> = ({ onActivityRecorded }) => {
  const { settings } = useSettings();
  const todayStr = toLocalDateString();

  const questsToDisplay = settings.faithFeatures
    ? [...BASE_QUESTS, ...FAITH_QUESTS]
    : BASE_QUESTS;

  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>(() => {
    const allStates = SafeStorage.getItem<Record<string, string[]>>(STORAGE_KEYS.QUEST_STATES, {});
    return allStates[todayStr] || [];
  });

  useEffect(() => {
    const allStates = SafeStorage.getItem<Record<string, string[]>>(STORAGE_KEYS.QUEST_STATES, {});
    allStates[todayStr] = completedQuestIds;
    SafeStorage.setItem(STORAGE_KEYS.QUEST_STATES, allStates);
  }, [completedQuestIds, todayStr]);

  const handleToggleQuest = (questId: string) => {
    setCompletedQuestIds((prev) => {
      const isAlreadyDone = prev.includes(questId);
      const updated = isAlreadyDone ? prev.filter((id) => id !== questId) : [...prev, questId];
      if (!isAlreadyDone) {
        recordActiveToday();
        onActivityRecorded();
      }
      return updated;
    });
  };

  const completedCount = completedQuestIds.filter((id) =>
    questsToDisplay.some((q) => q.id === id)
  ).length;

  return (
    <section className="card" style={{ padding: '18px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--accent-teal)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            Daily purposeful quests
          </span>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '2px 0 0' }}>
            Today's Small Challenges
          </h3>
        </div>
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: completedCount === questsToDisplay.length ? 'var(--accent-emerald)' : 'var(--bg-card-subtle)',
            color: completedCount === questsToDisplay.length ? '#ffffff' : 'var(--text-muted)'
          }}
        >
          {completedCount} / {questsToDisplay.length}
        </span>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
        Forgiving challenges designed to replace idle screen scrolling. Complete any that fit your day.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {questsToDisplay.map((quest) => {
          const isDone = completedQuestIds.includes(quest.id);
          return (
            <label
              key={quest.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isDone ? 'var(--accent-emerald-subtle)' : 'var(--bg-card-subtle)',
                border: isDone ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => handleToggleQuest(quest.id)}
                style={{
                  marginTop: '3px',
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--accent-emerald)',
                  cursor: 'pointer'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      textDecoration: isDone ? 'line-through' : 'none'
                    }}
                  >
                    {quest.title}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    ~{quest.durationMinutes}m
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {quest.description}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
};
