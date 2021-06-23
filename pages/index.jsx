import Image from 'next/image'
import Link from 'next/link'

import { defaultMemberPhoto, memberPhotoSize, getAllMembers } from '../lib/members'
import { galleryPhotoSize, getAllGalleryPhotos } from '../lib/gallery'
import Layout from '../components/layout'

import styles from './index.module.css'

const galleryUrl = 'https://photos.google.com/share/AF1QipO41GtE2yl75NTxkTXUjwKnV_h1lsO5k4vhe0Q98N7uhERjAcrirVTYt6XIzC5ePw?key=OFZkTzVLUTkyRU1fTURfWWpJMTdxQ3c1aGx6dnNR';

export async function getStaticProps() {
  return {
    props: {
      members: getAllMembers(),
      defaultMemberPhoto,
      memberPhotoSize,
      gallery: getAllGalleryPhotos(),
      galleryPhotoSize
    }
  };
}

export default function Index({ members, defaultMemberPhoto, memberPhotoSize, gallery, galleryPhotoSize }) {
  return (
    <Layout>
      <div>
        <div id="about" className="container">
          <h2>About Us</h2>
          <p>
            GameDev is the game development society of The University of Manchester. We are a passionate and determined group of developers who are curious to learn about the up and coming technologies within the gaming industry and share what we learn with others. We do this through our regular workshops and talks that anyone is able to attend. In addition to that, we also invite industry leaders to come and share their insights and ideas with our budding community. We also host an annual game-themed hackathon, called GameJam where participants try to make video games from scratch.
          </p>
        </div>
        <div id="team" className="container">
          <h2>Meet the Team</h2>
          <div>
            <ul className={`row ${styles.teamMemberList}`}>
              {members.map(({ name, position, photoSrc }, i) => {
                return (
                  <li key={i} className={styles.teamMember}>
                    <Image src={photoSrc || defaultMemberPhoto} height={memberPhotoSize.y} width={memberPhotoSize.x} alt={name} />
                    <div>
                      <span>{name}</span>
                      <br />
                      <span>{position}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div id="gallery">
          <h2>Gallery</h2>
          <div className="container text-center">
            For our full photo gallery, click <Link href={galleryUrl}>here</Link>.
          </div>
          <div>
            <ul className={`row ${styles.gallery}`}>
              {gallery.map(({ src, alt }, i) => {
                return (
                  <li key={i}>
                    <Image className={styles.galleryPhoto} src={src} height={galleryPhotoSize.y} width={galleryPhotoSize.x} alt={alt} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div id="contact" className="container">
          <h2>Contact Us</h2>
          <p className={styles.ColumnT}>Feel free to email us any inquiries that you may have!</p>
          <div className={styles.Row}>
            <p className={styles.Column}>alexandru@unicsmcr.com</p>
            <p className={styles.Column}>mikolaj@unicsmcr.com</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}