import { useRef, useEffect, useLayoutEffect } from 'react';

export default function useEventListener(
  eventNameStr: string,
  // eslint-disable-next-line no-unused-vars
  handlerFn: (event: Event) => void,
  element: HTMLElement | null | typeof window = window
): void {
  // eslint-disable-next-line no-unused-vars
  const savedHandler = useRef<(event: Event) => void>();

  useEffect(() => {
    savedHandler.current = handlerFn;
  }, [handlerFn]);

  useLayoutEffect(() => {
    // console.log(element);
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: Event): void =>
      savedHandler.current && savedHandler.current(event);
    element.addEventListener(eventNameStr, eventListener);

    // eslint-disable-next-line consistent-return
    return () => {
      element.removeEventListener(eventNameStr, eventListener);
    };
  }, [element, eventNameStr]);
}
