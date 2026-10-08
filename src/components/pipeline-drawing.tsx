import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../lib/utils";

type PipelineDrawingProps = {
  className?: string;
};

type Station = {
  number: string;
  name: string;
  cx: number;
  captions: string[];
};

const CY = 130;
const SIZE = 50;
const PORT_Y = 140;
const DIP_Y = 196;
const RAIL_Y = 212;
const JOG_X = 26;
const NUMBER_Y = 46;
const NAME_Y = 64;
const CAPTION_Y = 238;
const CAPTION_STEP = 15;
const FOOTNOTE_Y = 290;

const STATION_STAGGER_MS = 450;
const FACE_STAGGER_MS = 150;
const PIPE_DELAY_MS = 450;
const LABEL_DELAY_MS = 1000;

const STATIONS: Station[] = [
  {
    number: "01",
    name: "ask",
    cx: 110,
    captions: ["framework · preset", "name · GitHub URL"],
  },
  {
    number: "02",
    name: "scaffold",
    cx: 330,
    captions: [
      "official generators only",
      "create-vite@9.2.1",
      "create-next-app@16.3.6",
    ],
  },
  {
    number: "03",
    name: "configure",
    cx: 550,
    captions: [
      "tailwind · shadcn · biome",
      "site.ts · husky+commitlint",
      "cn() · components.json",
    ],
  },
  {
    number: "04",
    name: "land",
    cx: 770,
    captions: [
      "git init main · remote add",
      "chore commit · push -u origin main",
      "never --force",
    ],
  },
];

function topFace(cx: number, cy: number, s: number): string {
  return `M ${cx} ${cy - s} L ${cx + s} ${cy - s / 2} L ${cx} ${cy} L ${cx - s} ${cy - s / 2} Z`;
}

function leftFace(cx: number, cy: number, s: number): string {
  return `M ${cx - s} ${cy - s / 2} L ${cx} ${cy} L ${cx} ${cy + s} L ${cx - s} ${cy + s / 2} Z`;
}

function rightFace(cx: number, cy: number, s: number): string {
  return `M ${cx + s} ${cy - s / 2} L ${cx} ${cy} L ${cx} ${cy + s} L ${cx + s} ${cy + s / 2} Z`;
}

function elbowPipe(
  x1: number,
  x2: number,
  y: number,
  dip: number,
  jog: number,
): string {
  return `M ${x1} ${y} H ${x1 + jog} V ${dip} H ${x2 - jog} V ${y} H ${x2}`;
}

export function PipelineDrawing({ className }: PipelineDrawingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDrawn, setIsDrawn] = useState(false);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setIsDrawn(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-testid="pipeline-drawing"
      className={cn(
        "blueprint-grid w-full overflow-hidden",
        isDrawn && "is-drawn",
        className,
      )}
    >
      <svg
        viewBox="0 0 880 304"
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        className="block h-auto w-full"
      >
        <title id={titleId}>CLI pipeline: ask, scaffold, configure, land</title>
        <desc id={descId}>
          Pipeline of a run. 01 ask: prompts for framework, tech preset, project
          name, and GitHub URL. 02 scaffold: official generators only,
          create-vite 9.2.1 or create-next-app 16.3.6. 03 configure: Tailwind,
          shadcn cn plus components.json, Biome, site.ts, Husky plus Commitlint.
          04 land: git init on main, remote add, chore commit, push -u origin
          main, never force.
        </desc>

        <path
          d={`M 48 ${RAIL_Y} H 832`}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.4}
          className="draw"
          style={{ transitionDelay: "0ms" }}
        />

        {STATIONS.slice(0, STATIONS.length - 1).map((station, i) => {
          const next = STATIONS[i + 1];
          return (
            <path
              key={`pipe-${station.number}`}
              d={elbowPipe(
                station.cx + SIZE,
                next.cx - SIZE,
                PORT_Y,
                DIP_Y,
                JOG_X,
              )}
              pathLength={1}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="draw"
              style={{
                transitionDelay: `${i * STATION_STAGGER_MS + PIPE_DELAY_MS}ms`,
              }}
            />
          );
        })}

        {STATIONS.slice(0, STATIONS.length - 1).map((station, i) => {
          const next = STATIONS[i + 1];
          const delay = `${i * STATION_STAGGER_MS + PIPE_DELAY_MS}ms`;
          return (
            <g key={`ports-${station.number}`}>
              <circle
                cx={station.cx + SIZE}
                cy={PORT_Y}
                r={3.5}
                fill="currentColor"
                className="station-label"
                style={{ transitionDelay: delay }}
              />
              <circle
                cx={next.cx - SIZE}
                cy={PORT_Y}
                r={3.5}
                fill="currentColor"
                className="station-label"
                style={{ transitionDelay: delay }}
              />
            </g>
          );
        })}

        {STATIONS.map((station, i) => {
          const faces = [
            { key: "top", d: topFace(station.cx, CY, SIZE), fillOpacity: 0.04 },
            {
              key: "left",
              d: leftFace(station.cx, CY, SIZE),
              fillOpacity: 0.1,
            },
            {
              key: "right",
              d: rightFace(station.cx, CY, SIZE),
              fillOpacity: 0.18,
            },
          ];
          return (
            <g key={`cube-${station.number}`}>
              {faces.map((face, k) => (
                <path
                  key={face.key}
                  d={face.d}
                  pathLength={1}
                  fill="currentColor"
                  fillOpacity={face.fillOpacity}
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  className="draw"
                  style={{
                    transitionDelay: `${i * STATION_STAGGER_MS + k * FACE_STAGGER_MS}ms`,
                  }}
                />
              ))}
            </g>
          );
        })}

        {STATIONS.map((station, i) => {
          const delay = `${i * STATION_STAGGER_MS + LABEL_DELAY_MS}ms`;
          return (
            <g key={`label-${station.number}`} textAnchor="middle">
              <text
                x={station.cx}
                y={NUMBER_Y}
                fontSize={13}
                fontWeight={700}
                letterSpacing={2}
                fill="currentColor"
                className="station-label"
                style={{ transitionDelay: delay }}
              >
                {station.number}
              </text>
              <text
                x={station.cx}
                y={NAME_Y}
                fontSize={15}
                fontWeight={600}
                fill="currentColor"
                className="station-label"
                style={{ transitionDelay: delay }}
              >
                {station.name}
              </text>
              {station.captions.map((line, li) => (
                <text
                  key={line}
                  x={station.cx}
                  y={CAPTION_Y + li * CAPTION_STEP}
                  fontSize={10.5}
                  fill="var(--muted-foreground)"
                  className="station-label"
                  style={{ transitionDelay: delay }}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        <text
          x={440}
          y={FOOTNOTE_Y}
          textAnchor="middle"
          fontSize={10}
          fill="var(--muted-foreground)"
          className="station-label"
          style={{ transitionDelay: "2200ms" }}
        >
          * query / zustand / forms are optional
        </text>
      </svg>
    </div>
  );
}
