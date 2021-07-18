import React from 'react';

import Layout from '../components/layout';

import styles from './sponsors.module.css';
import type { Partner } from '../lib/sponsors';

import { getAllSponsors, getAllPartners } from '../lib/sponsors';

export async function getStaticProps() {
  return {
    props: {
      sponsors: getAllSponsors(),
      partners: getAllPartners(),
    },
  };
}

interface IndexParams {

  partners: Partner[]
}
export default function Sponsors({ partners }: IndexParams) {
  return (
    <Layout title="Sponsors">
      <div className={styles.banner}>
        <h2>Our Sponsors and Partners</h2>
        <h4>
          Interested in sponsoring us?
          <a href="#contact">Contact us</a>
          to find out more!
        </h4>
      </div>
      <h2>Partners:</h2>
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
    </Layout>
  );
}
