'use client';

import { useRef, useState } from 'react';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  src?: string;
  poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <div className={styles.player} onClick={handlePlay}>
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className={styles.video}
          onEnded={() => setPlaying(false)}
        />
      ) : (
        <div className={styles.placeholder}>
          {poster && <img src={poster} alt="Video thumbnail" className={styles.thumbnail} />}
        </div>
      )}

      {!playing && (
        <div className={styles.overlay}>
          <div className={styles.playButton}>
            <svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
