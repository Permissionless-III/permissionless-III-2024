export function getTimeLeft(futureDateInMs: number): string {
  const now = Date.now();
  const differenceInMs = futureDateInMs - now;

  if (differenceInMs <= 0) return "";

  const seconds = Math.floor((differenceInMs / 1000) % 60);
  const minutes = Math.floor((differenceInMs / (1000 * 60)) % 60);
  const hours = Math.floor((differenceInMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  } else if (minutes > 0) {
    return `${minutes} min ${seconds} sec`;
  } else {
    return `${seconds} sec`;
  }
}
