import { useState, useCallback } from 'react';

const useToggle = (default_value: boolean) => {
  const [value, setValue] = useState(default_value);

  const onToggle = useCallback(() => {
    setValue(!value);
  }, [value]);

  return [value, onToggle] as [boolean, typeof onToggle];
};

export default useToggle;
