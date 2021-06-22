import hljs from 'highlight.js' // TODO(mikolaj): consider only including necessary languages, instead of all of them
import micromark from 'micromark'

import { useEffect } from 'react'

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

const tutorialBlockMap = {
    'infopoint': Info,
    'heading': Head,
    'tutstep': Step
};

function Info({ body }) {
    if (body.length == 0) return <div></div>;

    return (
        <div>
            <hr />
            <details className={styles.infopoint}>
                <summary>{body[0].title}</summary>
                {body.map(({ type, ...props }) => {
                    return tutorialBlockMap[type](props);
                })}
            </details>
        </div>
    );
}

function Head({ title }) {
    return (
        <h2>{title}</h2>
    );
}

function Step({ title, body }) {
    return (
        <div>
            <h3>{title}</h3>
            <div className="text-break" dangerouslySetInnerHTML={{ __html: markdown(body) }} />
        </div>
    );
}

export default function Tutorial({ slug, created, edited, details }) {
    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return (
        <Layout title={slug}>
            <div className="container">
                <h1>{details.title}</h1>
                <div className="text-center">
                    <span>Created: {created}</span>{' - '}
                    <span>Edited: {edited}</span>
                </div>

                {details.videoUrl &&
                <div>
                    <h2>Video</h2>
                    <center>
                        <iframe className={styles.video} src={details.videoUrl} frameBorder="0" allowFullScreen></iframe>
                    </center>
                </div>}

                <h2>Contents</h2>
                <ol className={styles.tableOfContents}>
                    {details.tableOfContents.map((v, i) => {
                        return (
                            <li key={i}>
                                <hr />
                                {`${i}. ${v}`}
                            </li>
                        );
                    })}
                </ol>
            </div>
            <hr />
            <div className="container">
                {details.contents.map(({ type, ...props }) => {
                    return tutorialBlockMap[type](props);
                })}
            </div>
        </Layout>
    );
}