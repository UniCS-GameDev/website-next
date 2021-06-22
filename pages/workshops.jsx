import Link from 'next/link'

import { getAllWorkshops } from '../lib/workshops'
import Layout from '../components/layout'

import styles from './workshops.module.css'

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
            </div>
            <hr />
            <div className="container">
                <ul className={`row ${styles.workshopList}`}>
                    {workshops.map(({ slug, path, details, tutorialCount }, i) => {
                        return (
                            <Link href={`/workshops/${slug}`}>
                                <li key={i} className={styles.workshop}>
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