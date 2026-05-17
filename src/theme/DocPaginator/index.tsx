import React from 'react';
import type {Props} from '@theme/DocPaginator';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function ArrowLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.arrow}
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.arrow}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

type NavCardProps = {
  type: 'prev' | 'next';
  title: string;
  permalink: string;
};

function NavCard({type, title, permalink}: NavCardProps) {
  const isPrev = type === 'prev';
  return (
    <Link
      to={permalink}
      className={[styles.card, isPrev ? styles.cardPrev : styles.cardNext].join(' ')}
      aria-label={`${isPrev ? 'Previous' : 'Next'}: ${title}`}
    >
      <span className={styles.label}>
        {isPrev && <ArrowLeft />}
        <span>{isPrev ? 'Previous' : 'Next'}</span>
        {!isPrev && <ArrowRight />}
      </span>
      <span className={styles.title}>{title}</span>
    </Link>
  );
}

export default function DocPaginator({previous, next}: Props): React.JSX.Element {
  if (!previous && !next) {
    return <></>;
  }
  return (
    <nav className={styles.nav} aria-label="Docs pages navigation">
      <div className={styles.grid}>
        <div className={styles.prevSlot}>
          {previous && (
            <NavCard type="prev" title={previous.title} permalink={previous.permalink} />
          )}
        </div>
        <div className={styles.nextSlot}>
          {next && (
            <NavCard type="next" title={next.title} permalink={next.permalink} />
          )}
        </div>
      </div>
    </nav>
  );
}
