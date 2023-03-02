import React, { useEffect } from 'react';
interface Props {
  component: boolean;
  componentRef: React.MutableRefObject<null>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const onClickOutSide = ({ component, componentRef, setState }: Props) => {
  useEffect!(() => {
    const clickOutside = (e: MouseEvent) => {
      if (component && componentRef.current && componentRef.current !== e.target) {
        setState(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [component]);
};

export default onClickOutSide;
