/**
 * TODO Fix images
 */
export const imageResolver = (image: string) => {
  return image.startsWith('wp-content/') || image.startsWith('uploads/images/')
    ? image
    : image.startsWith('lazy/') || image.startsWith('companies/')
      ? `assets/images/${image}`
      : `assets/society/uploads/images/${image}`
}

export const imageUrlToData = (image: string) => {
  return image.replace(
    /^(assets\/images\/|assets\/society\/uploads\/images\/)/,
    '',
  )
}
