import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = {
  src: string;
  alt?: string;
};

/**
 * Architecture diagram with an explicit "Open full size" control.
 * Prefer this over client-side DOM hacks — React owns the page content.
 */
export default function ArchitectureDiagram({src, alt = ''}: Props): React.JSX.Element {
  const url = useBaseUrl(src);

  return (
    <figure className="architecture-diagram">
      <a href={url} target="_blank" rel="noopener noreferrer" title="Open full size in new tab">
        <img src={url} alt={alt} />
      </a>
      <figcaption className="architecture-diagram__actions">
        <a
          className="architecture-diagram__open"
          href={url}
          target="_blank"
          rel="noopener noreferrer">
          Open full size
        </a>
      </figcaption>
    </figure>
  );
}
