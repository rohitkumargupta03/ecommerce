"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type SafeImageProps = {
  src?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
};

const FALLBACK_SRC = "/placeholder-product.svg";

export function SafeImage({ src, alt, className, fallbackClassName }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  const imageSrc = useMemo(() => {
    if (!src || hasError) {
      return FALLBACK_SRC;
    }
    return src;
  }, [src, hasError]);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={1200}
      height={900}
      unoptimized
      className={hasError && fallbackClassName ? fallbackClassName : className}
      onError={() => {
        setHasError(true);
      }}
    />
  );
}
