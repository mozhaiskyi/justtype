'use client';

import { ReactNode, useState } from 'react';
import styles from './CodeSnippet.module.css';

interface CodeSnippetProps {
  children: ReactNode;
  copyText: string;
}

export default function CodeSnippet({ children, copyText }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className={styles.container}>
      <span className={styles.lineNumber}>1</span>
      <code className={styles.code}>{children}</code>
      <button onClick={handleCopy} className={styles.copyButton} aria-label="Copy to clipboard">
        {copied ? (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
}
