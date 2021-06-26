import Link from 'next/link'

import { getAllWorkshops } from '../lib/workshops'
import Layout from '../components/layout'

import styles from './workshops.module.css'

const fallbackWorkshopThumbnail = 'https://cdn.pixabay.com/photo/2018/05/19/01/23/online-3412498_960_720.jpg';

export async function getStaticProps() {
    return {
        props: {
            workshops: getAllWorkshops()
        }
    };
}

export default function Workshops({ workshops }) {
    return (
        <Layout title="Workshops">
            <div className="container">
                <h2>Workshops</h2>
                <p>
                    The UniCS GameDev team works on several tutorials that are run synchronously and asynchronously for students with the purpose of teaching them more about the different aspects of game development.
                </p>
                <hr />
            </div>
            <div className="container">
                <ul className={`row ${styles.workshopList}`}>
                    {workshops.map(({ slug, details, tutorialCount }, i) => {
                        return (
                            <li key={i} className={styles.workshop}>
                                <Link href={`/workshops/${slug}`} passHref>
                                    <div className={`container ${styles.card}`}>
                                        <div className={styles.cardThumbnail}>
                                            <img src={details.thumbnail || fallbackWorkshopThumbnail} height="320" width="320" objectFit="cover" alt={slug} />
                                        </div>
                                        <div className={`text-center ${styles.cardContent}`}>
                                            <span>{details.title}</span><br />
                                            <span>{details.intro}</span><br />
                                            <span>{tutorialCount} tutorials</span>
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