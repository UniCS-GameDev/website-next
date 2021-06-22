import Image from 'next/image'

import { galleryPhotoSize, getAllGalleryPhotos } from '../lib/gallery'
import Layout from '../components/layout'

import styles from './gallery.module.css'

export async function getStaticProps() {
    return {
        props: {
            gallery: getAllGalleryPhotos(),
            galleryPhotoSize
        }
    };
}

export default function Gallery({ gallery, galleryPhotoSize }) {
    return (
        <Layout title="Gallery">
            <h2>Gallery</h2>
            <ul className={`row ${styles.gallery}`}>
                {gallery.map(({ src, alt }, i) => {
                    return (
                        <li key={i}>
                            <Image className={styles.galleryPhoto} src={src} height={galleryPhotoSize.y} width={galleryPhotoSize.x} alt={alt} />
                        </li>
                    );
                })}
            </ul>
        </Layout>
    )
}