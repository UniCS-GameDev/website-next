import Link from 'next/link'

import { getAllWorkshops, getAllTutorials } from '../../lib/workshops'
import Layout from '../../components/layout'

import styles from '../workshops.module.css'

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

export default function Workshop({ slug: workshopSlug, details, tutorials }) {
    return (
        <Layout title={workshopSlug}>
            <div className="container">
                <h2>{details.title}</h2>
                <p>
                    {details.description}
                </p>
            </div>
            <br />
            <div className="container">
                <ul className={`row ${styles.tutorialList}`}>
                    {tutorials.map(({ slug }, i) => {
                        return (
                            <Link href={`/workshops/${workshopSlug}/${slug}`}>
                                <li key={i} className={styles.tutorial}>
                                    <span>{slug}</span>
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </div>
        </Layout>
    );
}