import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../lib/utils";

type PipelineDrawingProps = {
  className?: string;
};

type Station = {
  number: string;
  name: string;
  cx: number;
};

const CY = 130;
const SIZE = 50;
const PORT_Y = 128;
const NUMBER_Y = 46;
const NAME_Y = 64;

const STATION_STAGGER_MS = 450;
const FACE_STAGGER_MS = 150;
const PIPE_DELAY_MS = 450;
const LABEL_DELAY_MS = 1000;

const STATIONS: Station[] = [
  { number: "01", name: "technology", cx: 110 },
  { number: "02", name: "dependencies", cx: 330 },
  { number: "03", name: "name", cx: 550 },
  { number: "04", name: "github", cx: 770 },
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
      className={cn("w-full overflow-hidden", isDrawn && "is-drawn", className)}
    >
      <svg
        viewBox="0 0 880 196"
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        className="block h-auto w-full"
      >
        <title id={titleId}>
          Scaffolder steps: technology, dependencies, name, github
        </title>
        <desc id={descId}>
          Steps of a run. 01 technology: pick React plus Vite or Next.js. 02
          dependencies: choose which packages to install. 03 name: give the
          project a name. 04 github: enter the repository URL.
        </desc>

        {STATIONS.slice(0, STATIONS.length - 1).map((station, i) => {
          const next = STATIONS[i + 1];
          return (
            <path
              key={`pipe-${station.number}`}
              d={`M ${station.cx + SIZE} ${PORT_Y} H ${next.cx - SIZE}`}
              pathLength={1}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
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
            { key: "top", d: topFace(station.cx, CY, SIZE), fill: "#ffffff" },
            {
              key: "left",
              d: leftFace(station.cx, CY, SIZE),
              fill: "#efeeea",
            },
            {
              key: "right",
              d: rightFace(station.cx, CY, SIZE),
              fill: "#dcdad5",
            },
          ];
          return (
            <g key={`cube-${station.number}`}>
              {faces.map((face, k) => (
                <path
                  key={face.key}
                  d={face.d}
                  pathLength={1}
                  fill={face.fill}
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
            </g>
          );
        })}
      </svg>
    </div>
  );
}
