import {useEffect, useRef} from 'react';

const usePreviousState = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
};

export default usePreviousState;
