import React from 'react';
import Link from 'next/link';

import type { IMember } from '../lib/members';
import { defaultMemberPhoto, getAllMembers } from '../lib/members';

import type { IPhoto } from '../lib/gallery';
import getAllGalleryPhotos from '../lib/gallery';

import type { IPartner, ISponsor } from '../lib/sponsors';
import { getAllPartners, getAllSponsors } from '../lib/sponsors';

import Layout from '../components/layout';

import styles from './index.module.css';

const galleryUrl = 'https://photos.google.com/share/AF1QipO41GtE2yl75NTxkTXUjwKnV_h1lsO5k4vhe0Q98N7uhERjAcrirVTYt6XIzC5ePw?key=OFZkTzVLUTkyRU1fTURfWWpJMTdxQ3c1aGx6dnNR';

export async function getStaticProps() {
  return {
    props: {
      members: getAllMembers(),
      defaultMemberPhotoSrc: defaultMemberPhoto,
      partners: getAllPartners(),
      sponsors: getAllSponsors(),
      gallery: getAllGalleryPhotos(),
    },
  };
}

interface IndexParams {
  members: IMember[],
  defaultMemberPhotoSrc: string,
  partners: IPartner[],
  sponsors: ISponsor[],
  gallery: IPhoto[]
}

export default function Index({ members, defaultMemberPhotoSrc, partners, sponsors, gallery }: IndexParams) {
  return (
    <Layout>
      <div>
        <div id="about" className="container">
          <h2>About Us</h2>
          <p>
            UniCS GameDev is the game development society of The University of
            Manchester. Officially, we are part of the UniCS Computer Science Society. 
            We are a passionate and determined group of developers who are curious to learn 
            about the up and coming technologies within the gaming industry and share what we 
            learn with others. We do this through our regular workshops and talks that anyone is able to
            attend. In addition to that, we also invite industry leaders to come
            and share their insights and ideas with our budding community. We
            also host an annual game-themed hackathon, called GameJam where
            participants try to make video games from scratch.
          </p>
        </div>
        <div id="team" className="container">
          <h2>Meet the Team</h2>
          <div>
            <ul className="row">
              {members.map(({ name, position, photoSrc }, i) => (
                <li key={i}>
                  <div className={`card ${styles.teamMemberCard}`}>
                    <div className={styles.teamMemberCard} style={{ overflow: 'hidden' }}>
                      <img className="card-thumbnail" src={photoSrc || defaultMemberPhotoSrc} alt={name} />
                    </div>
                    <div className="card-content flex-rows">
                      <span className="card-item text-center">{name}</span>
                      <span className="card-item text-center">{position}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div id="sponsors" className="container">
          <h2>Our Sponsors and Partners</h2>
          <p className="text-center">
            Interested in sponsoring us? <a href="#contact">Contact us</a> so
            that we can arrange something!
          </p>
        </div>
        {partners.length > 0 &&
        <div>
          <h3>Partners:</h3>
          <div className={styles.eventTable}>
            {partners.map(({ name, description, photoSrc }, i) => (
              <div key={i} className={styles.partnerCard}>
                <img style={{ maxHeight: '200px' }} src={photoSrc} alt={name} />
                <span style={{ padding: '3em', alignContent: 'center' }}>
                  {description}
                </span>
              </div>
            ))}
          </div>
        </div>}
        {sponsors.length > 0 &&
        <div>
          <h3>Sponsors:</h3>
          <div className={styles.eventTable}>
            {sponsors.map(({ rank, description, photoSrc }, i) => (
              <div key={i} className={styles.partnerCard}>
                <img style={{ maxHeight: '200px' }} src={photoSrc} alt={rank} />
                <span style={{ padding: '3em', alignContent: 'center' }}>
                  {description}
                </span>
              </div>
            ))}
          </div>
        </div>}
        <div id="contact" className="container">
          <div className="text-center">
            <h2>Contact Us</h2>
            <p>Wanna sponsor us? Have a chat? We're one email away!</p>
          </div>
          <ul className="row">
            <li><span><a href="mailto:alexandru@unicsmcr.com">alexandru@unicsmcr.com</a></span></li>
            <li><span><a href="mailto:mikolaj@unicsmcr.com">mikolaj@unicsmcr.com</a></span></li>
          </ul>
        </div>
        <div id="gallery">
          <h2>Gallery</h2>
          <div className="container text-center">
            For our full photo gallery, click
            {' '}
            <Link href={galleryUrl}>here</Link>
            .
          </div>
          <div>
            <ul className="row">
              {gallery.map(({ src, alt }, i) => (
                <li key={i} className={styles.getAllGalleryPhotos}>
                  <div className="container">
                    <img className={`responsive-image ${styles.galleryPhoto}`} src={src} alt={alt} />
                  </div>
                </li>
              ))}
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
