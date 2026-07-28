import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import ArchitectureDiagram from '@site/src/components/ArchitectureDiagram';

/**
 * Markdown images (`![alt](src)`) map to lowercase `img`.
 * Architecture diagrams get an "Open full size" control.
 */
function MarkdownImg(props) {
  const src = props.src ?? '';
  if (typeof src === 'string' && src.includes('img/architecture/')) {
    return <ArchitectureDiagram src={src} alt={props.alt} />;
  }
  const OriginalImg = MDXComponents.img;
  return OriginalImg ? <OriginalImg {...props} /> : <img {...props} />;
}

export default {
  ...MDXComponents,
  img: MarkdownImg,
  ArchitectureDiagram,
};
