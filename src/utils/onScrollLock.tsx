import { useEffect } from 'react';

const onScrollLock = () => {
  useEffect!(() => {
    document.body.style.overflow = `hidden`;
    return () => {
      document.body.style.overflow = `auto`;
    };
  }, []);
};

export default onScrollLock;
