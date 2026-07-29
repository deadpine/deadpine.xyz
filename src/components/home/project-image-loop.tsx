"use client";

import Image from "next/image";
import { useState } from "react";
import {
  isVideoSrc,
  WebsiteVideoFrame,
} from "@/components/home/website-video-frame";

type ProjectImageLoopProps = {
  images: string[];
  alt: string;
  priority?: boolean;
};

export function ProjectImageLoop({
  images,
  alt,
  priority = false,
}: ProjectImageLoopProps) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;
  const src = images[index];

  // Toggle to show carousel controls (dots + arrows) under the image
  const showControls = false;

  const goPrev = () => {
    setIndex((current) => (current - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setIndex((current) => (current + 1) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="relative min-h-[440px] w-full overflow-hidden rounded-[12px] bg-[#F3F1EE]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-black/35">
            Image forthcoming
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative min-h-[440px] w-full overflow-hidden rounded-[12px] bg-[#EBE8E4]">
        {isVideoSrc(src) ? (
          <WebsiteVideoFrame key={src} src={src} title={alt} />
        ) : src.endsWith(".svg") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            key={src}
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1200px) 50vw, 100vw"
            priority={priority && index === 0}
            className="object-cover"
          />
        )}
      </div>

      {showControls && hasMultiple ? (
        <div className="mt-3 flex items-center justify-between">
          <div
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label="Image slides"
          >
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 cursor-pointer rounded-full transition-all ${
                  i === index
                    ? "w-4 bg-black/55"
                    : "w-1.5 bg-black/20 hover:bg-black/35"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/[0.06] font-sans text-lg leading-none text-black/60 transition-colors hover:bg-black/[0.1] hover:text-black"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/[0.06] font-sans text-lg leading-none text-black/60 transition-colors hover:bg-black/[0.1] hover:text-black"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
