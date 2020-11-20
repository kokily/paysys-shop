import { useRef, useCallback, useEffect } from 'react';

type Params = {
  offset?: number | null;
  cursor?: string | null;
  stop?: boolean;
  onLoadMore?: (cursor: string) => any;
  onLoadMoreByOffset?: (offset: number) => any;
};

const getScrollTop = () => {
  if (!document.body) return 0;

  const scollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;

  return scollTop;
};

const getScrollBottom = () => {
  if (!document.body) return 0;

  const { scrollHeight } = document.body;
  const { innerHeight } = window;
  const scrollTop = getScrollTop();

  return scrollHeight - innerHeight - scrollTop;
};

export default function useScroll({
  cursor,
  stop,
  offset,
  onLoadMore,
  onLoadMoreByOffset,
}: Params) {
  const last = useRef<string | number | null>(null);

  const preventBottomStick = useCallback(() => {
    if (getScrollBottom() === 0) {
      window.scrollTo(0, getScrollTop() - 1);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!cursor || !onLoadMore) return;
    if (cursor === last.current) return;

    last.current = cursor;

    await onLoadMore(cursor);
    preventBottomStick();
  }, [cursor, onLoadMore, preventBottomStick]);

  const loadMoreUsingOffset = useCallback(async () => {
    if (stop || !offset || !onLoadMoreByOffset) return;
    if (offset === last.current) return;

    last.current = offset;

    await onLoadMoreByOffset(offset);
    preventBottomStick();
  }, [offset, onLoadMoreByOffset, preventBottomStick, stop]);

  const onScroll = useCallback(() => {
    const scrollBottom = getScrollBottom();

    if (scrollBottom < window.screen.height) {
      loadMore();
      loadMoreUsingOffset();
    }
  }, [loadMore, loadMoreUsingOffset]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);
}
