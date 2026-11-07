import type { ImgHTMLAttributes } from "react";
import photoAssets from "../photo-assets.json";

export default function ArchivePhoto({ src, alt, style, ...props }: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) {
  const photo = photoAssets[src as keyof typeof photoAssets];
  return (
    <picture className="archive-picture">
      {"srcSet" in photo && <source type="image/avif" srcSet={photo.srcSet} sizes={props.sizes} />}
      <img
        {...props}
        src={src}
        alt={alt}
        style={{ backgroundImage: `url("${photo.placeholder}")`, ...style }}
      />
    </picture>
  );
}
