import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import { getVisitorId } from '../../utils/visitor.js';

export default function PoemLikeButton({ slug }) {
  const [visitorId] = useState(getVisitorId);
  const [likeState, setLikeState] = useState({ count: 0, liked: false, loading: true, error: false });

  useEffect(() => {
    let active = true;

    api.get(`/poems/${slug}/likes`, { params: { visitorId } })
      .then(({ data }) => {
        if (!active) return;
        setLikeState({ count: data.count, liked: data.liked, loading: false, error: false });
      })
      .catch(() => {
        if (!active) return;
        setLikeState((current) => ({ ...current, loading: false, error: true }));
      });

    return () => {
      active = false;
    };
  }, [slug, visitorId]);

  const toggleLike = async () => {
    if (likeState.loading) return;

    if (likeState.error) {
      setLikeState((current) => ({ ...current, loading: true }));
      try {
        const { data } = await api.put(`/poems/${slug}/likes`, { visitorId });
        setLikeState({ count: data.count, liked: data.liked, loading: false, error: false });
      } catch {
        setLikeState((current) => ({ ...current, loading: false, error: true }));
      }
      return;
    }

    const liked = !likeState.liked;
    setLikeState((current) => ({ ...current, loading: true }));

    try {
      const request = liked
        ? api.put(`/poems/${slug}/likes`, { visitorId })
        : api.delete(`/poems/${slug}/likes`, { data: { visitorId } });
      const { data } = await request;
      setLikeState({ count: data.count, liked: data.liked, loading: false, error: false });
    } catch {
      setLikeState((current) => ({ ...current, loading: false, error: true }));
    }
  };

  return (
    <button
      type="button"
      className={`poem-like-button${likeState.liked ? ' is-liked' : ''}`}
      onClick={toggleLike}
      aria-label={likeState.error
        ? `Retry loading likes for ${slug.replaceAll('-', ' ')}`
        : `${likeState.liked ? 'Unlike' : 'Like'} ${slug.replaceAll('-', ' ')}`}
      aria-pressed={likeState.liked}
      disabled={likeState.loading}
      title={likeState.error ? 'Like count unavailable. Tap to retry.' : undefined}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 8.7c0 4.1-8.8 10.1-8.8 10.1S3.2 12.8 3.2 8.7A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.4Z" />
      </svg>
      <span>{likeState.error ? '—' : likeState.count}</span>
    </button>
  );
}
