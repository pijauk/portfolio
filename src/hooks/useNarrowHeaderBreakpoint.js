import { useState, useEffect } from 'react';

const QUERY = '(max-width: 991.98px)';

//Mobilioje versijoje header’is keičia dizainą
export function useNarrowHeaderBreakpoint() {
  const [isNarrow, setIsNarrow] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(QUERY).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setIsNarrow(mql.matches);
    mql.addEventListener('change', onChange);
    onChange();
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isNarrow;
}
