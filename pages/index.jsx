import Image from 'next/image'

import { memberPhotoSize, getAllMembers } from '../lib/members'
import { galleryPhotoSize, getGalleryPhotos } from '../lib/gallery'
import Layout from '../components/layout'

import styles from './index.module.css'
import galleryStyles from './gallery.module.css'

const galleryPhotoCount = 2;

export async function getStaticProps() {
  return {
    props: {
      members: getAllMembers(),
      memberPhotoSize,
      gallery: getGalleryPhotos(galleryPhotoCount),
      galleryPhotoSize
    }
  };
}

export default function Index({ members, memberPhotoSize, gallery, galleryPhotoSize }) {
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
                    <Image src={photoSrc} height={memberPhotoSize.y} width={memberPhotoSize.x} alt={name} />
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
          <div>
            <ul className={`row ${galleryStyles.gallery}`}>
              {gallery.map(({ src, alt }, i) => {
                return (
                  <li key={i}>
                    <Image className={galleryStyles.galleryPhoto} src={src} height={galleryPhotoSize.y} width={galleryPhotoSize.x} alt={alt} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div id="contact" className="container">
          <h2>Contact Us</h2>
          <div>
            <form>
              <input id="name" name="name" className={styles.formInput} placeholder="John Doe" /><br />
              <input id="email" name="email" className={styles.formInput} placeholder="john.doe@gmail.com" /><br />
              <label htmlFor="subject">Subject:</label><br />
              <input id="subject" name="subject" className={styles.formInput} placeholder="Workshop Feedback" /><br />
              <label htmlFor="message">Message:</label><br />
              <textarea id="message" name="message" className={styles.formInput} rows="6" placeholder="Lorem ipsum dolor sit amet..." /><br />
              <hr />
              <input type="submit" className={styles.formSubmit} value="Send" />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}