import fs from 'fs'

export const defaultMemberPhoto = '/images/default_profile.svg';

export const memberPhotoSize = {
  x: 128,
  y: 128
};

export function getAllMembers() {
  return [
    {
      name: 'Alexandru Constantin',
      position: 'Co-Director',
      photoSrc: 'https://res.cloudinary.com/gamedev-unicsmcr/image/upload/v1609274544/12H-12_-_Alexandru_Constantin_cvvdc0.jpg'
    },
    {
      name: 'Mikolaj Lenczewski',
      position: 'Co-Director',
      photoSrc: 'https://res.cloudinary.com/gamedev-unicsmcr/image/upload/v1624751469/we_live_in_a_compsociety_wp0jiu.jpg'
    }
  ];
}