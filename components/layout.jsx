import Head from 'next/head'
import Link from 'next/link'

import { useEffect } from 'react'

import { Instagram, Facebook, Gitlab } from '../components/icons'

export default function Layout({ title, description, children }) {
    useEffect(() => {
        if (typeof(window) === 'object') {
            const themeToggler = document.getElementById('theme-toggler');
            const themeCookie = 'switchedThemeFromDefault';
    
            if (typeof Storage !== 'undefined') {
                themeToggler.checked = localStorage.getItem(themeCookie) === 'true';
            } else {
                console.log('No storage supported! Theme selection wont be saved!');
            }
    
            themeToggler.addEventListener('change', function(e) {
                if (typeof Storage !== 'undefined') {
                    if (e.currentTarget.checked === true) {
                        localStorage.setItem(themeCookie,'true');
                    } else {
                        localStorage.removeItem(themeCookie);
                    }
                } else {
                    console.log('No storage supported! Theme selection wont be saved!');
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
                            <Link href="/#about">About</Link>
                            <Link href="/#gallery">Gallery</Link>
                            <Link href="/#contact">Contact</Link>
                            <label className="nav-toggle-label" htmlFor="nav-toggler">
                                &#9776;
                            </label>
                        </div>
                        <label className="theme-toggle-label" htmlFor="theme-toggler">
                        </label>
                    </nav>
                </header>
                <hr />
                <main>
                    {children}
                </main>
                <hr />
                <footer className="footer">
                    <div className="text-center">
                        <a className="footer-icon" href="https://www.instagram.com/unics_gamedev/"><Instagram style={{fontSize: '2em'}} /></a>
                        <a className="footer-icon" href="https://www.facebook.com/UniCsGameDev/"><Facebook style={{fontSize: '2em'}} /></a>
                        <a className="footer-icon" href="https://gitlab.cs.man.ac.uk/unics-game-development/"><Gitlab style={{fontSize: '2em'}} /></a>
                        <br />
                        <span>UniCS GameDev © 2020</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}