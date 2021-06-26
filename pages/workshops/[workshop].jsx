import Link from 'next/link'

import { getAllWorkshops, getAllTutorials } from '../../lib/workshops'
import Layout from '../../components/layout'

import styles from '../workshops.module.css'

const fallbackTutorialThumbnail = 'https://connect-prd-cdn.unity.com/20191022/learn/images/19f1f73a-f566-4358-84c7-c0e2acf720d2_FPS_Split_1800.png.2000x0x1.webp';

export async function getStaticPaths() {
    return {
        paths: getAllWorkshops().map(({ slug }) => {
            return {
                params: {
                    workshop: slug
                }
            };
        }),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const workshops = getAllWorkshops();

    const details = workshops.find((v, i, _) => {
        return v.slug === params.workshop;
    }).details;

    return {
        props: {
            slug: params.workshop,
            details,
            tutorials: getAllTutorials(params.workshop)
        }
    };
}

export default function Workshop({ slug: workshopSlug, details: workshopDetails, tutorials }) {
    return (
        <Layout title={workshopSlug}>
            <div className="container">
                <h2>{workshopDetails.title}</h2>
                <p>
                    {workshopDetails.description}
                </p>
            </div>
            <br />
            <div className="container">
                <ul className={`row ${styles.tutorialList}`}>
                    {tutorials.map(({ slug, created, edited, details }, i) => {
                        return (
                            <li key={i} className={styles.tutorial}>
                                <Link href={`/workshops/${workshopSlug}/${slug}`} passHref>
                                    <div className={`container ${styles.card}`}>
                                        <div className={styles.cardThumbnail}>
                                            <img src={details.thumbnail || fallbackTutorialThumbnail} height="320" width="320" alt={slug} />
                                        </div>
                                        <div className={`text-center ${styles.cardContent}`}>
                                            <span>{details.title}</span><br />
                                            <span>{details.description}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Layout>
    );
}