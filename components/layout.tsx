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
          <nav className="navbar flex-spaced">
            <input type="checkbox" className="hidden-input menu-toggle" id="menu-toggler" />
            <ul className="navbar-menu" id="menu">
              <li>
                <label className="menu-toggle-label" htmlFor="menu-toggler">
                  <img className="menu-toggle-icon" src="/menu.svg" alt="menu" />
                </label>
              </li>
              <Link href="https://www.unicsmcr.com" passHref><li className="menu-link">UniCS</li></Link>
              <Link href="/" passHref><li className="menu-link">GameDev</li></Link>
              <Link href="/workshops" passHref><li className="menu-link">Workshops</li></Link>
              <Link href="/events" passHref><li className="menu-link">Events</li></Link>
            </ul>
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
            <a className="footer-icon" href="https://www.instagram.com/unics_uom/"><Instagram style={{ fontSize: '2em' }} /></a>
            <a className="footer-icon" href="https://www.facebook.com/unicsmanchester/"><Facebook style={{ fontSize: '2em' }} /></a>
            <a className="footer-icon" href="https://github.com/UniCS-GameDev/"><Gitlab style={{ fontSize: '2em' }} /></a>
            <br />
            <span>UniCS GameDev © 2021</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
