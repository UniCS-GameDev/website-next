import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Instagram, Facebook, Gitlab } from './icons';

export interface LayoutParams {
  title?: string,
  description?: string,
  children: any
}

export default function Layout({ title, description, children }: LayoutParams) {
  useEffect(() => {
    if (typeof (window) === 'object') {
      const themeToggler = document.getElementById('theme-toggler') as HTMLInputElement;
      const themeCookie = 'switchedThemeFromDefault';

      if (typeof Storage !== 'undefined') {
        themeToggler.checked = localStorage.getItem(themeCookie) === 'true';
      }

      themeToggler.addEventListener('change', (e) => {
        if (typeof Storage !== 'undefined') {
          if ((e.currentTarget as HTMLInputElement).checked === true) {
            localStorage.setItem(themeCookie, 'true');
          } else {
            localStorage.removeItem(themeCookie);
          }
        }
      });
    }
  }, []);

  return (
    <div id="__themed_padding">
      <Head>
        <title>{title ?? 'UniCS Game Dev'}</title>
        <meta name="description" content={description ?? 'UniCS Game Dev'} />
      </Head>
      <input type="checkbox" className="hidden-input theme-toggle" id="theme-toggler" />
      <div id="themed">
        <header className="header">
          <input type="checkbox" className="hidden-input nav-toggle" id="nav-toggler" />
          <nav className="navbar" id="navbar">
            <div>
              <Link href="/">GameDev</Link>
              <Link href="/workshops">Workshops</Link>
              <Link href="/events">Events</Link>
              <label className="nav-toggle-label" htmlFor="nav-toggler">
                &#9776;
              </label>
            </div>
            <label className="theme-toggle-label" htmlFor="theme-toggler" />
          </nav>
        </header>
        <hr />
        <main>
          {children}
        </main>
        <hr />
        <footer className="footer">
          <div className="text-center">
            <a className="footer-icon" href="https://www.instagram.com/unics_gamedev/"><Instagram style={{ fontSize: '2em' }} /></a>
            <a className="footer-icon" href="https://www.facebook.com/UniCsGameDev/"><Facebook style={{ fontSize: '2em' }} /></a>
            <a className="footer-icon" href="https://gitlab.cs.man.ac.uk/unics-game-development/"><Gitlab style={{ fontSize: '2em' }} /></a>
            <br />
            <span>UniCS GameDev © 2020</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
