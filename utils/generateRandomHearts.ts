export type RandomHeart = {
  id: number;
  top: number;
  left: number;
  size: string;
  opacity: number;
  duration: number;
};

const HEART_SIZES = [
  "text-2xl",
  "text-3xl",
  "text-4xl",
  "text-5xl",
  "text-6xl",
];

export function generateRandomHearts(count: number): RandomHeart[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 80 + 5,
    left: Math.random() * 80 + 5,
    size: HEART_SIZES[Math.floor(Math.random() * HEART_SIZES.length)],
    opacity: Math.random() * 0.15 + 0.05,
    duration: Math.random() * 2 + 2,
  }));
}
