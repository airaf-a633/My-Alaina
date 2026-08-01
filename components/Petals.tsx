/*
 * Fixed, hand-tuned values rather than Math.random() — random would produce a
 * different layout on the server and the client and blow up hydration.
 */
const PETALS = [
  { left: 6, size: 13, duration: 17, delay: 0, tint: "#f0c4cc" },
  { left: 18, size: 9, duration: 22, delay: 4, tint: "#e2a4b1" },
  { left: 29, size: 15, duration: 19, delay: 9, tint: "#f0c4cc" },
  { left: 41, size: 8, duration: 25, delay: 2, tint: "#f5d7dc" },
  { left: 53, size: 12, duration: 20, delay: 12, tint: "#e2a4b1" },
  { left: 64, size: 10, duration: 24, delay: 6, tint: "#f0c4cc" },
  { left: 76, size: 14, duration: 18, delay: 15, tint: "#f5d7dc" },
  { left: 87, size: 9, duration: 23, delay: 3, tint: "#e2a4b1" },
  { left: 94, size: 11, duration: 21, delay: 10, tint: "#f0c4cc" },
];

export function Petals() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            background: p.tint,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
