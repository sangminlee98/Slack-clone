import { useState, useCallback } from 'react';

const useInput = (initialData: string): [string, React.Dispatch<React.SetStateAction<string>>, (e: React.ChangeEvent<HTMLInputElement>) => void, ] => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  return [value, setValue, handler];
}

export default useInput;