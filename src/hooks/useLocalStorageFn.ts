import { useEffect, useState } from 'react';

function getStorageValueFn(keyStr: string, initialValue: object) {
  const savedValueStr = localStorage.getItem(keyStr);

  const nowDate = new Date();

  if (savedValueStr) {
    try {
      const savedValueObj = JSON.parse(savedValueStr);

      if (nowDate.getTime() > savedValueObj.expiry) {
        localStorage.removeItem(keyStr);
        return null;
      }
      return savedValueObj.value;
    } catch (error) {
      return null;
    }
  }

  return initialValue;
}

export default function useLocalStorageFn(
  keyStr: string,
  initialValueStrOj: object,
  timeNum: number
) {
  const [valueObjSt, setValueStrObjSt] = useState(() =>
    getStorageValueFn(keyStr, initialValueStrOj)
  );

  useEffect(() => {
    const nowDate = new Date();

    localStorage.setItem(
      keyStr,
      JSON.stringify({ value: valueObjSt, expiry: nowDate.getTime() + timeNum })
    );
  }, [keyStr, valueObjSt, timeNum]);

  return [valueObjSt, setValueStrObjSt];
}
