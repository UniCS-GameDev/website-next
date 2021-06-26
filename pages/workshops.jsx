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
                <ul className="row">
                    {workshops.map(({ slug, details, tutorialCount }, i) => {
                        return (
                            <li key={i}>
                                <Link href={`/workshops/${slug}`} passHref>
                                    <div className={`card ${styles.workshopCard}`}>
                                        <img className="card-thumbnail" src={details.thumbnail || fallbackWorkshopThumbnail} alt={slug} />
                                        <div className="card-content flex-rows">
                                            <span className="card-item text-center">{details.title}</span>
                                            <span className="card-item text-center">{details.intro}</span>
                                            <span className="card-item text-center">{tutorialCount} tutorials</span>
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