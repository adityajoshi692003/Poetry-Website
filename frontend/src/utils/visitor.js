const VISITOR_ID_KEY = 'poetry-ink-visitor-id';

const createVisitorId = () => {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16);
    return (character === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
};

export const getVisitorId = () => {
  try {
    const storedId = localStorage.getItem(VISITOR_ID_KEY);
    if (storedId) return storedId;

    const visitorId = createVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
    return visitorId;
  } catch {
    return createVisitorId();
  }
};
