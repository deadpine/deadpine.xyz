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
  const poster = isVideoSrc(src)
    ? images.find((image) => !isVideoSrc(image))
    : undefined;

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
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F3F1EE] md:aspect-auto md:min-h-90 lg:min-h-110">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
            Image forthcoming
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#EBE8E4] motion-safe:transition-[border-radius] motion-safe:duration-500 motion-safe:ease-out hover:rounded-[7rem] md:aspect-auto md:min-h-90 lg:min-h-110">
        {isVideoSrc(src) ? (
          <WebsiteVideoFrame
            key={src}
            src={src}
            poster={poster}
            title={alt}
            className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105"
          />
        ) : src.endsWith(".svg") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105"
          />
        ) : (
          <Image
            key={src}
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={priority && index === 0}
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105"
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
                    ? "w-4 bg-stone-500"
                    : "w-1.5 bg-stone-300 hover:bg-stone-400"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-stone-100 font-sans text-lg leading-none text-stone-500 transition-colors duration-200 ease-out hover:bg-stone-200 hover:text-black"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-stone-100 font-sans text-lg leading-none text-stone-500 transition-colors duration-200 ease-out hover:bg-stone-200 hover:text-black"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
