import Link from 'next/link'

import { defaultMemberPhoto, memberPhotoSize, getAllMembers } from '../lib/members'
import { getAllGalleryPhotos } from '../lib/gallery'
import Layout from '../components/layout'

import styles from './index.module.css'

const galleryUrl = 'https://photos.google.com/share/AF1QipO41GtE2yl75NTxkTXUjwKnV_h1lsO5k4vhe0Q98N7uhERjAcrirVTYt6XIzC5ePw?key=OFZkTzVLUTkyRU1fTURfWWpJMTdxQ3c1aGx6dnNR';

export async function getStaticProps() {
  return {
    props: {
      members: getAllMembers(),
      defaultMemberPhoto,
      memberPhotoSize,
      gallery: getAllGalleryPhotos()
    }
  };
}

export default function Index({ members, defaultMemberPhoto, memberPhotoSize, gallery }) {
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
            <ul className="row">
              {members.map(({ name, position, photoSrc }, i) => {
                return (
                  <li key={i}>
                    <div className={`card ${styles.teamMemberCard}`}>
                      <div className={styles.teamMemberCard} style={{overflow: 'hidden'}}>
                        <img className="card-thumbnail" src={photoSrc || defaultMemberPhoto} alt={name} />
                      </div>
                      <div className="card-content flex-rows">
                        <span className="card-item text-center">{name}</span>
                        <span className="card-item text-center">{position}</span>
                      </div>
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
            <ul className="row">
              {gallery.map(({ src, alt }, i) => {
                return (
                  <li key={i} className={styles.getAllGalleryPhotos}>
                    <div className="container">
                      <img className={`responsive-image ${styles.galleryPhoto}`} src={src} alt={alt} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div id="contact" className="container">
          <div className="text-center">
            <h2>Contact Us</h2>
            <p>Feel free to email us any inquiries that you may have!</p>
          </div>
          <ul className="row">
            <li><span>alexandru@unicsmcr.com</span></li>
            <li><span>mikolaj@unicsmcr.com</span></li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}