export interface IPartner {
    name: string,
    description: string,
    photoSrc: string
}

export function getAllPartners(): IPartner[] {
  return [
    {
      name: 'Unity',
      description: 'Unity is a cross-platform game engine developed by Unity Technologies, first announced and released in June 2005 at Apple Inc.\'s Worldwide Developers Conference as a Mac OS X-exclusive game engine. Unity is so much more than the world’s best real-time development platform – it’s also a robust ecosystem designed to enable your success. Join our dynamic community of creators so you can tap into what you need to achieve your vision.',
      photoSrc: 'https://b-waterstudios.com/wp-content/uploads/2021/03/unity-logo-1230x690-2.jpg',
    },
  ];
}

export interface ISponsor {
  rank: string,
  description: string,
  photoSrc: string
}

export function getAllSponsors(): ISponsor[] {
  return [];
}
