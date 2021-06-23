import fs from 'fs'

export const galleryPhotoSize = {
  x: 512,
  y: 288
};

export function getAllGalleryPhotos() {
  return [
    {
      src: '/images/img0.jpg',
      alt: ''
    },
    {
      src: '/images/img1.jpg',
      alt: ''
    }
  ];
}