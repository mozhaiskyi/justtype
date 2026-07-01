'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const isVisible = useRef(false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          (document.activeElement as HTMLElement)?.blur();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(player);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!isVisible.current) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement).isContentEditable) return;

      const video = videoRef.current;
      if (!video) return;

      if (e.key === ' ') {
        e.preventDefault();
        if (video.paused) { video.play(); setPlaying(true); }
        else { video.pause(); setPlaying(false); }
      } else if (e.key === 'j' || e.key === 'J') {
        video.currentTime = Math.max(0, video.currentTime - 10);
      } else if (e.key === 'l' || e.key === 'L') {
        video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play(); setPlaying(true); }
    else { video.pause(); setPlaying(false); }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
    setProgress(ratio * 100);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <div ref={playerRef} className={styles.player}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={styles.video}
        muted
        loop
        playsInline
        onTimeUpdate={() => {
          const v = videoRef.current;
          if (v && v.duration) setProgress((v.currentTime / v.duration) * 100);
        }}
        onEnded={() => { setPlaying(false); setProgress(0); }}
      />

      {!playing && (
        <div className={styles.overlay} onClick={togglePlay}>
          <div className={styles.playButton}>
            <svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      <div className={styles.controls}>
        <div className={styles.progressTrack} onClick={seek}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.buttonsRow}>
          <button className={styles.controlBtn} onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button className={styles.controlBtn} onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
            {muted ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l1.73 1.73L21 18.46 4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
