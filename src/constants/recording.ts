export const MIME_TYPES = [
  'video/webm;codecs=vp9,opus',
  'video/webm;codecs=vp8,opus',
  'video/webm',
] as const;

export const SOURCE_TYPES = {
  SCREEN: 'screen',
  WINDOW: 'window',
} as const;