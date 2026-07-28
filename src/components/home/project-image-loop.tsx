"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  isVideoSrc,
  WebsiteVideoFrame,
} from "@/components/home/website-video-frame";

type ProjectImageLoopProps = {
  images: string[];
  alt: string;
  priority?: boolean;
  intervalMs?: number;
};

export function ProjectImageLoop({
  images,
  alt,
  priority = false,
  intervalMs = 2600,
}: ProjectImageLoopProps) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!hasMultiple) return;

    // Don't auto-advance while a video slide is active — let the clip loop
    if (isVideoSrc(images[index] ?? "")) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [hasMultiple, images, images.length, intervalMs, index]);

  if (images.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#F3F1EE]">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-black/35">
          Image forthcoming
        </span>
      </div>
    );
  }

  return (
    <>
      {images.map((src, i) => {
        const isActive = i === index;
        if (!isActive) return null;

        if (isVideoSrc(src)) {
          return (
            <WebsiteVideoFrame
              key={src}
              src={src}
              title={alt}
            />
          );
        }

        const isSvg = src.endsWith(".svg");

        return (
          <div key={src} className="absolute inset-0">
            {isSvg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1200px) 50vw, 100vw"
                priority={priority && i === 0}
                className="object-cover"
              />
            )}
          </div>
        );
      })}
    </>
  );
}
