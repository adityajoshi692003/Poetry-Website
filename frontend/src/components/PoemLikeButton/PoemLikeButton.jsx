import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import { getVisitorId } from '../../utils/visitor.js';

const readLocal = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeLocal = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
};

export default function PoemLikeButton({ slug, poemId }) {
  const [visitorId] = useState(getVisitorId);
  const [likeState, setLikeState] = useState({ count: 0, liked: false, loading: true });
  const localLikeKey = `poetry-ink-like:${slug}`;

  useEffect(() => {
    let active = true;

    if (!poemId) {
      const liked = readLocal(localLikeKey) === 'true';
      setLikeState({ count: liked ? 1 : 0, liked, loading: false });
      return () => {
        active = false;
      };
    }

    api.get(`/poems/${slug}/likes`, { params: { visitorId } })
      .then(({ data }) => {
        if (!active) return;
        setLikeState({ count: data.count, liked: data.liked, loading: false });
        writeLocal(localLikeKey, String(data.liked));
      })
      .catch(() => {
        if (!active) return;
        setLikeState({
          count: readLocal(localLikeKey) === 'true' ? 1 : 0,
          liked: readLocal(localLikeKey) === 'true',
          loading: false
        });
      });

    return () => {
      active = false;
    };
  }, [localLikeKey, poemId, slug, visitorId]);

  const toggleLike = async () => {
    if (likeState.loading) return;
    const liked = !likeState.liked;
    setLikeState((current) => ({ ...current, loading: true }));

    if (!poemId) {
      const count = liked ? 1 : 0;
      writeLocal(localLikeKey, String(liked));
      setLikeState({ count, liked, loading: false });
      return;
    }

    try {
      const request = liked
        ? api.put(`/poems/${slug}/likes`, { visitorId })
        : api.delete(`/poems/${slug}/likes`, { data: { visitorId } });
      const { data } = await request;
      setLikeState({ count: data.count, liked: data.liked, loading: false });
      writeLocal(localLikeKey, String(data.liked));
    } catch {
      const currentLiked = readLocal(localLikeKey) === 'true';
      const nextCount = Math.max(0, likeState.count + (liked && !currentLiked ? 1 : !liked && currentLiked ? -1 : 0));
      writeLocal(localLikeKey, String(liked));
      setLikeState({ count: nextCount, liked, loading: false });
    }
  };

  return (
    <button
      type="button"
      className={`poem-like-button${likeState.liked ? ' is-liked' : ''}`}
      onClick={toggleLike}
      aria-label={`${likeState.liked ? 'Unlike' : 'Like'} ${slug.replaceAll('-', ' ')}`}
      aria-pressed={likeState.liked}
      disabled={likeState.loading}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 8.7c0 4.1-8.8 10.1-8.8 10.1S3.2 12.8 3.2 8.7A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.4Z" />
      </svg>
      <span>{likeState.count}</span>
    </button>
  );
}
