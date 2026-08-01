/*
 * Hand-drawn-ish flower heads, all sharing one local coordinate system:
 * the bloom sits at (0,0), the stem hangs down toward (0,150).
 * That lets the same shape work as a bouquet stem, a picking button,
 * or a small ornament without redrawing anything.
 */

export const FLOWER_KINDS = [
  "daisy",
  "tulip",
  "rose",
  "poppy",
  "sprig",
] as const;

export type FlowerKind = (typeof FLOWER_KINDS)[number];

/** Deterministic kind per index so server and client always agree. */
export function kindFor(i: number): FlowerKind {
  return FLOWER_KINDS[i % FLOWER_KINDS.length];
}

const PETAL = "#f0c4cc";
const PETAL_DEEP = "#e2a4b1";
const ROSE = "#c9748a";
const ROSE_DEEP = "#a8556c";
const OCHRE = "#c2a15b";
const SAGE = "#8c9e86";
const SAGE_DEEP = "#6d7f68";

function Bloom({ kind, tone }: { kind: FlowerKind; tone: "light" | "deep" }) {
  const fill = tone === "deep" ? ROSE : PETAL;
  const edge = tone === "deep" ? ROSE_DEEP : PETAL_DEEP;

  switch (kind) {
    case "daisy":
      return (
        <g>
          {Array.from({ length: 9 }, (_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-17"
              rx="6"
              ry="16"
              fill={fill}
              stroke={edge}
              strokeWidth="1"
              transform={`rotate(${i * 40})`}
            />
          ))}
          <circle cx="0" cy="0" r="7.5" fill={OCHRE} />
          <circle cx="-2" cy="-2" r="2" fill="#dcc389" />
        </g>
      );

    case "tulip":
      return (
        <g>
          <path
            d="M-15 2 C -15 -20, -7 -30, 0 -30 C 7 -30, 15 -20, 15 2 C 15 12, -15 12, -15 2 Z"
            fill={fill}
            stroke={edge}
            strokeWidth="1.2"
          />
          <path d="M0 -29 L0 8" stroke={edge} strokeWidth="1.2" fill="none" />
          <path
            d="M-15 2 C -10 -14, -6 -22, -5 -29"
            stroke={edge}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M15 2 C 10 -14, 6 -22, 5 -29"
            stroke={edge}
            strokeWidth="1.2"
            fill="none"
          />
        </g>
      );

    case "rose":
      return (
        <g>
          <circle cx="0" cy="-4" r="19" fill={fill} stroke={edge} strokeWidth="1.2" />
          <path
            d="M-11 -4 A 11 11 0 1 1 8 2"
            fill="none"
            stroke={edge}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M-5.5 -4 A 5.5 5.5 0 1 1 4 -0.5"
            fill="none"
            stroke={edge}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="0" cy="-4" r="2" fill={edge} />
        </g>
      );

    case "poppy":
      return (
        <g>
          {[
            [-11, -12],
            [11, -12],
            [-13, 2],
            [13, 2],
          ].map(([cx, cy], i) => (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx="13"
              ry="11.5"
              fill={fill}
              stroke={edge}
              strokeWidth="1"
              opacity="0.94"
            />
          ))}
          <circle cx="0" cy="-5" r="5.5" fill="#4a3540" />
        </g>
      );

    case "sprig":
      return (
        <g>
          {[
            [0, -30],
            [-8, -19],
            [8, -14],
            [-7, -4],
            [7, 3],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={i === 0 ? 6.5 : 5}
              fill={fill}
              stroke={edge}
              strokeWidth="1"
            />
          ))}
        </g>
      );
  }
}

/** Bloom + curving stem + one leaf. Used in the bouquets. */
export function Stem({
  kind,
  tone = "light",
  curve = 14,
  length = 150,
}: {
  kind: FlowerKind;
  tone?: "light" | "deep";
  curve?: number;
  length?: number;
}) {
  return (
    <g>
      <path
        d={`M0 12 C ${curve} ${length * 0.35}, ${-curve} ${length * 0.7}, ${curve * 0.3} ${length}`}
        stroke={SAGE}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M${curve * 0.75} ${length * 0.4} C ${curve * 0.75 + 20} ${length * 0.4 - 14}, ${curve * 0.75 + 26} ${length * 0.4 + 8}, ${curve * 0.75} ${length * 0.46}`}
        fill={SAGE}
        opacity="0.85"
      />
      <path
        d={`M${-curve * 0.2} ${length * 0.66} C ${-curve * 0.2 - 22} ${length * 0.66 - 12}, ${-curve * 0.2 - 26} ${length * 0.66 + 10}, ${-curve * 0.2} ${length * 0.72}`}
        fill={SAGE_DEEP}
        opacity="0.75"
      />
      <Bloom kind={kind} tone={tone} />
    </g>
  );
}

/** Just the head, no stem. Used for the pickable reason flowers. */
export function Head({
  kind,
  tone = "light",
  size = 72,
  className,
}: {
  kind: FlowerKind;
  tone?: "light" | "deep";
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-42 -42 84 84"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <Bloom kind={kind} tone={tone} />
    </svg>
  );
}
