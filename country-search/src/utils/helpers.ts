export function debounce(func: Function, delay: number) {
  let timeoutId: any;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}