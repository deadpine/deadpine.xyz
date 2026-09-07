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
  const stage = stageClassName;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${stage} ${className}`}
    >
      <div className="w-[82%] overflow-hidden rounded-[12px] bg-black shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <video
          key={src}
          src={src}
          poster={poster}
          aria-label={title}
          className="block h-auto w-full"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}
