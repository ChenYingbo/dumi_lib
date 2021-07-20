/**
 * Created by /Users/chenyingbo on 2021/03/25
 */
import React, { Fragment, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Raf from 'raf';
// import { getTargetRect, scrollTo } from './util.js';
import './AnchorScroll.less';

// function throttle(fn, delay = 200, threshold = 600) {
//   let timer = null; // 定时器
//   let last = null; // 上次执行fn时间
//   return function(...args) {
//     const context = this;
//     const now = +Date.now();
//     if (!last) {
//       last = now;
//     }
//     if (now - last < threshold) {
//       timer && clearTimeout(timer);
//       timer = setTimeout(() => {
//         last = now;
//         fn.apply(context, args);
//       }, delay);
//     } else {
//       last = now;
//       timer && clearTimeout(timer);
//       fn.apply(context, args);
//     }
//   };
// }

function getTargetRect(target) {
  return target !== window
    ? target.getBoundingClientRect()
    : document.documentElement.getBoundingClientRect() ||
        document.body.getBoundingClientRect();
}

function scrollTo(target, scrollTop) {
  if (target === window) {
    document.body.scrollTop = scrollTop;
    document.documentElement.scrollTop = scrollTop;
  } else {
    target.scrollTop = scrollTop;
  }
}

const AnchorScroll = props => {
  const {
    items,
    children,
    activeClass,
    className,
    style,
    container,
    offsetTop,
  } = props;
  const [elementStatus, setElementStatus] = useState([]); // 受监控元素的状态
  const [detectElements, setDetectElements] = useState([]); // 受监控元素,可能存在空项
  const flag = useRef(true); // 点击Anchor菜单项，滚动期间，不执行监听滚动事件
  const scheduledAnimationFrame = useRef(false); // 管理raf回调函数，防止同一帧回调被执行多次
  const listener = useRef();
  const detectElementsRef = useRef([]);
  const elementStatusRef = useRef([]);

  useEffect(() => {
    buildDetectlements(items);
    listener.current = container.addEventListener('scroll', onScroll);
    return () => {
      listener.current && listener.current.remove();
    };
  }, [items]);

  // 生成受监控的元素
  const buildDetectlements = ids => {
    let eles = [],
      eleStatus = [];
    for (let i = 0; i < ids.length; i++) {
      eles.push(document.getElementById(ids[i]));
      eleStatus.push(false);
    }

    setDetectElements(eles);
    setElementStatus(eleStatus);
    detect(eles);
  };

  useEffect(() => {
    detectElementsRef.current = detectElements;
  }, [detectElements]);

  useEffect(() => {
    elementStatusRef.current = elementStatus;
  }, [elementStatus]);

  // 处理滚动事件
  const onScroll = React.useCallback(() => {
    if (scheduledAnimationFrame.current) return;
    scheduledAnimationFrame.current = true;
    flag.current &&
      Raf(() => {
        scheduledAnimationFrame.current = false;
        detect(detectElementsRef.current);
      });
  }, [detectElements]);

  // 监控元素状态

  const detect = detectElements => {
    const containerRect = getTargetRect(container);
    const elementStatus = elementStatusRef.current;
    const containerOffset =
      container !== window
        ? container.scrollTop
        : window.pageXOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
    const _elementStatus = detectElements.map(el =>
      isActive(el, containerRect, containerOffset),
    );

    if (
      _elementStatus.length !== elementStatus.length ||
      !_elementStatus.every((item, index) => item === elementStatus[index])
    ) {
      setElementStatus(_elementStatus);
    }
  };
  // 判断当前受监控元素，是否处于active 状态，即受控元素是否在offset位置
  const isActive = (detectElement, containerRect, containerOffset) => {
    if (detectElement) {
      const detectElementRect = getTargetRect(detectElement);
      const position = containerRect.top + offsetTop;

      return (
        +detectElementRect.top <= +position &&
        +position < +detectElementRect.bottom
      );
    }

    return false;
  };

  //受控元素点击事件
  const handleClickElement = index => {
    const detectElements = detectElementsRef.current;

    let elementStatus = [];
    for (let i = 0; i < detectElements.length; i++) {
      i === index ? elementStatus.push(true) : elementStatus.push(false);
    }
    setElementStatus(elementStatus);

    const detectElement = detectElements[index];

    if (!detectElement) return;

    flag.current = false;
    const elementRect = getTargetRect(detectElement);
    const firstElementRect = getTargetRect(detectElements[0]);

    // 点击元素距离container距离
    const offset = elementRect.top - firstElementRect.top;
    const containerOffset =
      container !== window
        ? container.scrollTop
        : window.pageXOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;

    // 1.手动滚动
    let start = null;
    // 滚动动画
    const frameFunc = () => {
      if (!start) start = Date.now();
      const progress = Date.now() - start;
      const scrollTop =
        containerOffset +
        (progress / 500) * (offset - offsetTop - containerOffset);
      if (progress < 500) {
        // window.requestAnimationFrame(frameFunc);
        scrollTo(container, scrollTop);
        Raf(frameFunc);
      } else {
        scrollTo(container, Math.ceil(offset - offsetTop));
        setTimeout(() => {
          flag.current = true;
          scheduledAnimationFrame.current = false;
        }, 600);
      }
    };
    // window.requestAnimationFrame(frameFunc);
    Raf(frameFunc);
  };

  const itemsNode = React.Children.map(children, (child, index) => {
    if (!child) return;
    const childClass = classNames({
      [`${child.props.className}`]: child.props.className,
      [`${activeClass}`]: elementStatus[index],
    });

    return React.cloneElement(child, {
      className: childClass,
      onClick: () => handleClickElement(index),
    });
  });

  return (
    <Fragment>
      <div className="anchor-scroll">
        <div className={className || ''} style={style || ''}>
          {itemsNode}
        </div>
      </div>
    </Fragment>
  );
};

AnchorScroll.defaultProps = {
  items: [], // 受监控元素id值
  offsetTop: 50,
  style: {},
  container: window,
};

export default AnchorScroll;
