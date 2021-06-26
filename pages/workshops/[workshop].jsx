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
            <div className={`container`}>
                <ul className="row">
                    {tutorials.map(({ slug, created, edited, details }, i) => {
                        return (
                            <li key={i}>
                                <Link href={`/workshops/${workshopSlug}/${slug}`} passHref>
                                    <div className={`card ${styles.tutorialCard}`}>
                                        <img className="card-thumbnail" src={details.thumbnail || fallbackTutorialThumbnail} alt={slug} />
                                        <div className="card-content flex-rows">
                                            <span className="card-item text-center">{details.title}</span>
                                            <span className="card-item text-center">{details.description}</span>
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