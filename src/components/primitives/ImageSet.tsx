import { MultiFormatImage } from '@/lib/urls'
import { ComponentPropsWithoutRef } from 'react'

type ImageSetProps = {
  sources: Partial<MultiFormatImage>
} & Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'srcSet'>

export default function ImageSet({ sources, alt, ...props }: ImageSetProps) {
  if (!sources) {
    throw new Error('ImageSet: src is required')
  }

  if (!sources.avifSrc && !sources.webpSrc && !sources.fallbackSrc) {
    throw new Error('ImageSet: at least one src is required')
  }

  return (
    <picture>
      {sources.avifSrc && <source srcSet={sources.avifSrc} type="image/avif" />}
      {sources.webpSrc && <source srcSet={sources.webpSrc} type="image/webp" />}
      <img src={sources.fallbackSrc} {...props} alt={alt ?? ''} />
    </picture>
  )
}
