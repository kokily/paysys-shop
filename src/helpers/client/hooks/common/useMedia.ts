import { useEffect, useState } from 'react';
import { useIsMounted } from './useIsMounted';

export function useMedia(query: string) {
  const [matches, setMatches] = useState<boolean | null>(
    typeof window !== 'undefined' ? () => window.matchMedia(query).matches : null,
  );

  const isMounted = useIsMounted();

  useEffect(() => {
    if (!isMounted()) {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const listener = () => {
      if (isMounted()) {
        setMatches(mediaQueryList.matches);
      }
    };

    mediaQueryList.addListener(listener);

    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, [query, isMounted]);

  return matches;
}
