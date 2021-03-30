---
title: ''
nav:
  path: /components
  title: '组件'
group:
  path: /global
  title: '通用'
---

## AnchorScroll

Demo:

```tsx
import React, { useEffect, useState } from 'react';
import { AnchorScroll } from 'dumi-lib';

console.log('AnchorScroll', AnchorScroll);

export default () => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    setContainer(document.getElementById('app'));
  }, []);

  return (
    <>
      <div
        style={{ height: '400px', overflow: 'auto', position: 'relative' }}
        id="app"
      >
        {container && (
          <AnchorScroll
            container={container}
            className="anchor"
            activeClass="active"
            items={['section1', 'section2', 'section3', 'section4']}
          >
            <div>section1</div>
            <div>section2</div>
            <div>section3</div>
            <div>section4</div>
          </AnchorScroll>
        )}
        <section id="section1" style={{ background: '#f00', height: '300px' }}>
          <h1> section1 </h1>
        </section>
        <section id="section2" style={{ background: '#0f0', height: '500px' }}>
          <h1> section2 </h1>
        </section>
        <section id="section3" style={{ background: '#00f', height: '200px' }}>
          <h1> section3 </h1>
        </section>
        <section id="section4" style={{ background: '#ff0', height: '900px' }}>
          <h1> section4 </h1>
        </section>
      </div>
    </>
  );
};
```
