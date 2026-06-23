import styles from './OnOffDemo.module.css';

export default function OnOffDemo() {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.card}>
          <input
            type="text"
            placeholder="Text box..."
            className={styles.input}
          />
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
          />
        </div>
        <p className={styles.label}>
          Just Type is <span className={styles.on}>on</span>
        </p>
      </div>
    </div>
  );
}
