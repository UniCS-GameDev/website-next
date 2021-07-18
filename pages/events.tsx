import React from 'react';
import Link from 'next/link';

import type { IEvent } from '../lib/events';
import { getHistoricalEvents, getUpcomingEvents } from '../lib/events';

import { Clock, Facebook, Location } from '../components/icons';
import Layout from '../components/layout';

import styles from './events.module.css';

function stringifyDatetimes(events: IEvent[]) {
  return events.map(({ datetime, ...props }) => ({
    datetime: datetime.toLocaleString(),
    ...props,
  }));
}

export async function getStaticProps() {
  return {
    props: {
      upcoming: stringifyDatetimes(getUpcomingEvents()),
      historical: stringifyDatetimes(getHistoricalEvents()),
    },
  };
}

function PlaceholderCard() {
  return (
    <div>
      <p>No events available right now. Follow our Facebook to stay tuned!</p>
    </div>
  );
}

function EventCard({ title, description, datetime, location, url }: IEvent) {
  return (
    <div className={styles.eventCardBox}>
      <h4>{title}</h4>
      <p>{description}</p>
      <div className={styles.eventSpecs}>
        <span><Clock />{' '}{datetime}</span>
        {' | '}
        <span><Location />{' '}{location}</span>
        {' | '}
        <span><Facebook />{' '}<Link href={url ?? '#'}>Event Announcement</Link></span>
      </div>
    </div>
  );
}

interface EventsParams {
  upcoming: IEvent[],
  historical: IEvent[]
}

export default function Events({ upcoming, historical }: EventsParams) {
  return (
    <Layout title="Events">
      <div className={styles.eventTable}>
        <div className={styles.eventColumn}>
          <h2>Upcoming Events</h2>
          <ul className={styles.eventList}>
            {upcoming.length > 0 && upcoming.map((props, i) => (
              <li key={i}>
                {EventCard(props)}
              </li>
            )) || PlaceholderCard()}
          </ul>
        </div>
        <div className={styles.eventColumn}>
          <h2>Past Events</h2>
          <ul className={styles.eventList}>
            {historical.length > 0 && historical.map((props, i) => (
              <li key={i}>
                {EventCard(props)}
              </li>
            )) || PlaceholderCard()}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
