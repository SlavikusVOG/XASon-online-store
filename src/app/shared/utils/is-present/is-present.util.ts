export const isPresent = <T>(value?: T | null): value is T => {
  return value != null;
};
