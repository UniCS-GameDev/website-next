import fs from 'fs'

export const galleryPhotoSize = {
  x: 512,
  y: 288
};

export function getAllGalleryPhotos() {
  return [
    {
      src: 'https://photos.app.goo.gl/cx7i6zDvjqAtwAto9',
      alt: ''
    },
    {
      src: 'https://photos.app.goo.gl/5ZikHag4wjUB8gMv6',
      alt: ''
    }
  ];
}

export function getGalleryPhotos(count) {
  const photos = [], allPhotos = getAllGalleryPhotos();

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * allPhotos.length);
    photos.push(allPhotos.splice(index, 1)[0]);
  }

  return photos;
}