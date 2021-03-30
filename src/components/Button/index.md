---
title: '按钮'
nav:
  path: /components
  title: 组件
group:
  path: /global
  title: '通用'
---

## Button

Demo:

```tsx
import React, { Fragment } from 'react';
import { Button } from 'dumi-lib';

const { ButtonSize, ButtonType } = Button;

export default () => {
  return (
    <Fragment>
      <div>
        <Button disabled>测试</Button>
        <Button btnType="primary">primary</Button>
        <Button btnType="link" href="http://www.baidu.com">
          Link
        </Button>
      </div>
      <div>
        <Button></Button>
      </div>
    </Fragment>
  );
};
```
