import micromark from 'micromark'

import { getAllWorkshops, getAllTutorials } from '../../../lib/workshops'
import Layout from '../../../components/layout'

import styles from './[tutorial].module.css'

export async function getStaticPaths() {
    return {
        paths: getAllWorkshops().flatMap(({ slug: workshopSlug }) => {
            return getAllTutorials(workshopSlug).map(({ slug }) => {
                return {
                    params: {
                        workshop: workshopSlug,
                        tutorial: slug,
                    }
                };
            });
        }),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const tutorials = getAllTutorials(params.workshop);

    const tutorial = tutorials.find((v, i, obj) => {
        return v.slug === params.tutorial;
    });

    return {
        props: tutorial
    };
}

function markdown(source) {
    return micromark(source, {
        extensions: [],
        htmlExtensions: []
    })
}

function Heading({ text }) {
    return (
        <h2>{text}</h2>
    );
}

function Infopoint({ header, text }) {
    return (
        <div>
            <h3>{header}</h3>
            <div className="text-break" dangerouslySetInnerHTML={{ __html: markdown(text) }} />
        </div>
    );
}

function Tutstep({ title, description }) {
    return (
        <div>
            <h3>{title}</h3>
            <div className="text-break" dangerouslySetInnerHTML={{ __html: markdown(description) }} />
        </div>
    );
}

export default function Tutorial({ slug, created, edited, details }) {
    return (
        <Layout title={slug}>
            <div className="container">
                <h1>{details.title}</h1>
                <div className="text-center">
                    <span>Created: {created}</span>{' - '}
                    <span>Edited: {edited}</span>
                </div>
                <ol className={styles.tableOfContents}>
                    {details.tableOfContents.map((v, i) => {
                        return (
                            <li key={i}>
                                {v}
                            </li>
                        );
                    })}
                </ol>
            </div>
            <hr />
            <div className="container">
                {details.contents.map(({ type, ...props }) => {
                    return {
                        'heading': Heading,
                        'infopoint': Infopoint,
                        'tutstep': Tutstep
                    }[type](props);
                })}
            </div>
        </Layout>
    );
}