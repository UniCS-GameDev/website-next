export interface IPhoto {
  src: string,
  alt: string
}

export default function getAllGalleryPhotos(): IPhoto[] {
  return [
    {
      src: '/images/img0.jpg',
      alt: '',
    },
    {
      src: '/images/img1.jpg',
      alt: '',
    },
  ];
}
