import Head from 'next/head'
import Link from 'next/link'

import { Heart, Instagram, Facebook, Gitlab } from '../components/icons'

export default function Layout({ title, description, children }) {
    function navResponsive() {
        if (typeof window === 'object') {
            var x = document.getElementById("navbar");

            if (x.className === "navbar") {
                x.className += " responsive";
            } else {
                x.className = "navbar";
            }
        }
    }

    return (
        <div id="__themed_padding">
            <Head>
                <title>{title ?? 'UniCS Game Dev'}</title>
                <meta name="description" content={description ?? 'UniCS Game Dev'} />
            </Head>
            <input type="checkbox" className="theme-toggle" id="theme-toggler" />
            <div id="themed">
                <header className="header">
                    <nav className="navbar" id="navbar">
                        <div>
                            <Link href="/">Index</Link>
                            <Link href="/workshops">Workshops</Link>
                            <Link href="/events">Events</Link>
                            <Link href="/#about">About</Link>
                            <Link href="/#gallery">Gallery</Link>
                            <Link href="/#contact">Contact</Link>
                            <a className="icon" onClick={navResponsive}>
                            &#9776;
                            </a>
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
                        <a className="footerIcon" href="https://www.instagram.com/unics_gamedev/"><Instagram style={{fontSize: '2em'}} /></a>
                        <a className="footerIcon" href="https://www.facebook.com/UniCsGameDev/"><Facebook style={{fontSize: '2em'}} /></a>
                        <a className="footerIcon" href="https://gitlab.cs.man.ac.uk/unics-game-development/"><Gitlab style={{fontSize: '2em'}} /></a>
                        <br />
                        <span className="d-none d-lg-block d-xl-block">Coded with <Heart /> by GameDev! | UniCS GameDev © 2020</span>
                        <span className="d-lg-none d-xl-none">UniCS GameDev © 2020</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}