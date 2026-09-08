"use client";

import { useEffect, useRef } from "react";

type WebsiteVideoFrameProps = {
  src: string;
  poster?: string;
  title?: string;
  /** Stage background; defaults to warm paper gray. */
  stageClassName?: string;
  className?: string;
};

const VIDEO_EXT = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;

export function isVideoSrc(src: string): boolean {
  return VIDEO_EXT.test(src);
}

/** Bust browsers that cached the previous HTML 404 as this URL. */
function mediaUrl(src: string): string {
  if (src.includes("?")) return src;
  return `${src}?v=1`;
}

/**
 * Gray stage with a centered website-recording video at 82% width.
 * Muted, looping, autoplaying for portfolio display.
 */
export function WebsiteVideoFrame({
  src,
  poster,
  title = "Website recording",
  stageClassName = "bg-[#E8E6E3]",
  className = "",
}: WebsiteVideoFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const url = mediaUrl(src);
  const stage = stageClassName;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;

    const tryPlay = () => {
      void el.play().catch(() => {});
    };

    tryPlay();
    el.addEventListener("canplay", tryPlay);
    el.addEventListener("loadeddata", tryPlay);
    return () => {
      el.removeEventListener("canplay", tryPlay);
      el.removeEventListener("loadeddata", tryPlay);
    };
  }, [url]);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${stage} ${className}`}
    >
      <div className="w-[82%] overflow-hidden rounded-[12px] bg-black shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <video
          ref={videoRef}
          poster={poster}
          aria-label={title}
          className="block h-auto w-full"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={url} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
