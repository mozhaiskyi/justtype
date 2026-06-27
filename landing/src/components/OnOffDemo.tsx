'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './OnOffDemo.module.css';

type Letter = { id: number; char: string; exiting: boolean };

export default function OnOffDemo() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const lettersRef = useRef<Letter[]>([]);
  lettersRef.current = letters;
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key.length !== 1) return;

      const id = Date.now();
      const visible = lettersRef.current.filter(l => !l.exiting);

      if (visible.length >= 2) {
        const oldestId = visible[0].id;
        setLetters(prev => prev.map(l => (l.id === oldestId ? { ...l, exiting: true } : l)));
        const removeTimer = setTimeout(() => {
          setLetters(prev => prev.filter(l => l.id !== oldestId));
        }, 300);
        timersRef.current.push(removeTimer);
      }

      setLetters(prev => [...prev, { id, char: e.key, exiting: false }]);

      const exitTimer = setTimeout(() => {
        setLetters(prev => prev.map(l => (l.id === id ? { ...l, exiting: true } : l)));

        const removeTimer = setTimeout(() => {
          setLetters(prev => prev.filter(l => l.id !== id));
        }, 300);

        timersRef.current.push(removeTimer);
      }, 1000);

      timersRef.current.push(exitTimer);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.card}>
          <input
            type="text"
            placeholder="Text box..."
            className={styles.input}
            tabIndex={-1}
          />
          <div className={styles.lettersArea}>
            {letters.map(letter => (
              <div
                key={letter.id}
                className={`${styles.letterTile} ${styles.letterTileConsumed}`}
                data-exiting={letter.exiting}
              >
                {letter.char.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
        <p className={styles.label}>
          Just Type is <span className={styles.off}>off</span>
        </p>
      </div>

      <div className={styles.column}>
        <div className={styles.card}>
          <input
            type="text"
            placeholder="Text box..."
            className={styles.input}
            tabIndex={-1}
          />
          <div className={styles.lettersArea}>
            {letters.map(letter => (
              <div
                key={letter.id}
                className={styles.letterTile}
                data-exiting={letter.exiting}
              >
                {letter.char.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
        <p className={styles.label}>
          Just Type is <span className={styles.on}>on</span>
        </p>
      </div>
    </div>
  );
}
