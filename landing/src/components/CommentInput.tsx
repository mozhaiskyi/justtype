'use client';

import { useEffect, useRef } from 'react';

export default function CommentInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleVideoVisible = () => {
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.blur();
      }
    };
    document.addEventListener('videoPlayerVisible', handleVideoVisible);
    return () => document.removeEventListener('videoPlayerVisible', handleVideoVisible);
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Add a comment..."
      className="flex-1 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 text-sm text-neutral-500 placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-colors"
    />
  );
}
