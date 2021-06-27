import React, { useEffect, useState } from 'react';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import csharp from 'highlight.js/lib/languages/csharp';

import micromark from 'micromark';

import type {
  IStep, IHead, IInfo, ITutorial,
} from '../../../lib/workshops';

import { getAllWorkshops, getAllTutorials } from '../../../lib/workshops';
import Layout from '../../../components/layout';

import styles from './[tutorial].module.css';

export async function getStaticPaths() {
  return {
    paths: getAllWorkshops().flatMap((w) => getAllTutorials(w.slug).map(({ slug }) => ({
      params: {
        workshop: w.slug,
        tutorial: slug,
      },
    }))),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const tutorials = getAllTutorials(params.workshop);

  const tutorial = tutorials.find((v) => v.slug === params.tutorial);

  return {
    props: tutorial,
  };
}

function markdown(source: string): string {
  return micromark(source, {
    extensions: [],
    htmlExtensions: [],
  });
}

const tutorialBlockMap = {
  infopoint: InfopointBlock,
  heading: HeadingBlock,
  tutstep: StepBlock,
};

function formatStepId(stepTitle: string): string {
  return stepTitle.toLowerCase().replace(' ', '-');
}

function InfopointBlock({ body }: IInfo) {
  if (body.length === 0) return <div />;

  return (
    <div>
      <hr />
      <details className={styles.infopoint}>
        <summary>{body[0].title}</summary>
        {body.map(({ type, ...props }) => tutorialBlockMap[type](props))}
      </details>
    </div>
  );
}

function HeadingBlock({ title }: IHead) {
  return (
    <h2>{title}</h2>
  );
}

function StepBlock({ title, body }: IStep, isCompletable?: boolean) {
  function handleStep(stepTitle: string) {
    if (document.getElementById(`${stepTitle}button`).innerHTML === 'Mark step as completed') {
      if (document.getElementById('stepper').lastChild !== document.getElementById(`${stepTitle}item`)) {
        document.getElementById(`${stepTitle}tail`).style.backgroundColor = '#008000';
      }

      document.getElementById(`${stepTitle}icon`).style.backgroundColor = '#008000';
      document.getElementById(`${stepTitle}button`).innerHTML = 'Mark step as incomplete';
      document.getElementById(`${stepTitle}button`).classList.add(styles.completed);
      return;
    }

    if (document.getElementById(`${stepTitle}button`).innerHTML === 'Mark step as incomplete') {
      document.getElementById(`${stepTitle}tail`).style.backgroundColor = '#f0f0f0';
      document.getElementById(`${stepTitle}icon`).style.backgroundColor = '#f0f0f0';
      document.getElementById(`${stepTitle}button`).innerHTML = 'Mark step as completed';
      document.getElementById(`${stepTitle}button`).classList.remove(styles.completed);
    }
  }

  return (
    <div id={formatStepId(title)}>
      <h3>{title}</h3>
      <div className="text-break" dangerouslySetInnerHTML={{ __html: markdown(body) }} />
      {isCompletable
            && <button type="button" id={`${title}button`} onClick={() => handleStep(title)} className={styles.completeButton}>Mark step as completed</button>}
    </div>
  );
}

interface ProgressNavParams {
  tableOfContents: string[]
}

function ProgressNav({ tableOfContents }: ProgressNavParams) {
  const [display, setDisplay] = useState('<');

  function handleNav() {
    if (document.getElementById('floating-modal').style.width !== '0px') {
      document.getElementById('floating-modal').style.width = '0px';
      document.getElementById('floating-modal').style.display = 'none';
      document.getElementById('close-button').style.marginLeft = '0px';
      setDisplay('>');
    } else {
      document.getElementById('floating-modal').style.width = '-moz-fit-content';
      document.getElementById('floating-modal').style.width = 'fit-content';
      document.getElementById('floating-modal').style.display = 'block';
      setDisplay('<');
      document.getElementById('close-button').style.marginLeft = getComputedStyle(document.getElementById('floating-modal')).width;
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <button type="button" id="close-button" className={styles.openbtn} onClick={handleNav}>{display}</button>
      <div id="floating-modal" className={styles.floatingModal}>
        <div id="stepper" className={styles.StepVertical}>
          {tableOfContents.map((stepTitle, i) => (
            <div id={`${stepTitle}item`} key={i} className={styles.StepItem}>
              <a href={`#${formatStepId(stepTitle)}`}>
                <div className={styles.ItemContainer}>
                  <div id={`${stepTitle}tail`} className={styles.ItemTail} />
                  <div id={`${stepTitle}icon`} className={styles.ItemIcon} />
                  <div className={styles.ItemContent}>
                    <div className={styles.ItemTitle}>
                      {stepTitle}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Tutorial({
  slug, created, edited, details,
}: ITutorial) {
  const [windowSize, setWindowSize] = useState({ width: undefined });

  useEffect(() => {
    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('csharp', csharp);
    hljs.highlightAll();

    document.getElementById('close-button').style.marginLeft = getComputedStyle(document.getElementById('floating-modal')).width;

    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.getElementById('close-button').style.marginLeft = getComputedStyle(document.getElementById('floating-modal')).width;
  }, [windowSize]);

  return (
    <Layout title={slug}>
      <div className="container">
        <h1>{details.title}</h1>
        <div className="text-center">
          <span>
            Created:
            {created}
          </span>
          {' - '}
          <span>
            Edited:
            {edited}
          </span>
        </div>
        {details.videoUrl
          && (
          <div>
            <h2>Video</h2>
            <div style={{ textAlign: 'center' }}>
              <iframe title="test" className={styles.video} src={details.videoUrl} frameBorder="0" allowFullScreen />
            </div>
          </div>
          )}
      </div>
      {ProgressNav(details)}
      <hr />
      <div className="container">
        {details.contents.map(({ type, ...props }) => tutorialBlockMap[type](props, true))}
      </div>
    </Layout>
  );
}
