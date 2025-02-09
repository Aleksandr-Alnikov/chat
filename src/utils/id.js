export const id = (prefix = 'id') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36)}`;
};