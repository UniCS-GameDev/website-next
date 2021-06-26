import hljs from 'highlight.js' // TODO(mikolaj): consider only including necessary languages, instead of all of them
import micromark from 'micromark'

import { useEffect, useState } from 'react'

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
function hashIds(id){
    return id.toLowerCase().trim();
}
function handleStep(title){
    if(document.getElementById(title+'button').innerHTML === 'Mark step as completed'){
        if(document.getElementById('stepper').lastChild !== document.getElementById(title + 'item')){
            document.getElementById(title + 'tail').style.backgroundColor = '#008000';
        }
        document.getElementById(title + 'icon').style.backgroundColor = '#008000';
        document.getElementById(title+'button').innerHTML = 'Mark step as incomplete';
        document.getElementById(title+'button').classList.add(styles.completed)
        return;
    }
    if(document.getElementById(title+'button').innerHTML === 'Mark step as incomplete'){
        document.getElementById(title + 'tail').style.backgroundColor = '#f0f0f0';
        document.getElementById(title + 'icon').style.backgroundColor = '#f0f0f0';
        document.getElementById(title+'button').innerHTML = 'Mark step as completed';
        document.getElementById(title+'button').classList.remove(styles.completed)
    }
}
function Step({ title, body }) {

    return (
        <div id={hashIds(title)}>
            <h3>{title}</h3>
            <div className="text-break" dangerouslySetInnerHTML={{ __html: markdown(body) }} />
            <button id={title+'button'} onClick={()=>handleStep(title)} className={styles.completeButton}>Mark step as completed</button>
        </div>
    );
}

export default function Tutorial({ slug, created, edited, details }) {
    const [display, setDisplay] = useState('<')
    const [windowSize, setWindowSize] = useState({
        width: undefined,
      });
    function handleNav () {
        if (document.getElementById('floating-modal').style.width !== '0px') {
          document.getElementById('floating-modal').style.width = '0px'
          document.getElementById('floating-modal').style.display = 'none'
          document.getElementById('close-button').style.marginLeft = '0px'
          setDisplay('>')
        } else {
          document.getElementById('floating-modal').style.width = '-moz-fit-content'
          document.getElementById('floating-modal').style.width = 'fit-content'
          document.getElementById('floating-modal').style.display = 'block'
          setDisplay('<')
          document.getElementById('close-button').style.marginLeft = getComputedStyle(document.getElementById('floating-modal')).width
        }
    }
    useEffect(() => {
        document.getElementById('close-button').style.marginLeft = getComputedStyle(document.getElementById('floating-modal')).width
        hljs.highlightAll();
        function handleResize() {
            setWindowSize({
              width: window.innerWidth,
            });
          }
          window.addEventListener("resize", handleResize);
          handleResize();
          return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(()=>{
        document.getElementById('close-button').style.marginLeft = getComputedStyle(document.getElementById('floating-modal')).width
    },[windowSize])
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
            </div>
            <div style={{display: 'flex'}}>
            <button id='close-button' className={styles.openbtn} onClick={handleNav}>{display}</button>
            <div id='floating-modal' className={styles.floatingModal}>
            <div id={'stepper'} className={styles.StepVertical}>
                {details.tableOfContents.map((v, i) => {
                    return (
                    <div id={v +'item'} key={i} className={styles.StepItem}>
                        <a href={'#' + hashIds(v)}>
                            <div className={styles.ItemContainer}>
                                <div id={v +'tail'} className={styles.ItemTail}/>
                                <div id={v+ 'icon'}className={styles.ItemIcon}/>
                                <div className={styles.ItemContent}>
                                <div className={styles.ItemTitle}>
                                    {v}
                                </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    );
                })}
            </div>
            </div>
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