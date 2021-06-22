import Head from 'next/head'
import Link from 'next/link'

import HeartFilled from '../components/icons/heart'
import Instagram from '../components/icons/instagram'
import Facebook from '../components/icons/facebook'
import Gitlab from '../components/icons/gitlab'

export default function Layout({ title, description, children }) {
    return (
        <div id="__themed_padding">
            <Head>
                <title>{title ?? 'UniCS Game Dev'}</title>
                <meta name="description" content={description ?? 'UniCS Game Dev'} />
            </Head>
            <input type="checkbox" className="theme-toggle" id="theme-toggler" />
            <div id="themed">
                <header className="header">
                    <nav className="navbar">
                        <div>
                            <Link href="/">Index</Link>{' | '}
                            <Link href="/workshops">Tutorials</Link>{' | '}
                            <Link href="/events">Events</Link>{' | '}
                            <Link href="/gallery">Gallery</Link>{' | '}
                            <Link href="/#about">About</Link>{' | '}
                            <Link href="/#contact">Contact</Link>
                        </div>
                        <label className="theme-toggle-label" htmlFor="theme-toggler">
                            <span className="d-none d-lg-block d-xl-block">Toggle theme::</span>
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
                        <a href="https://www.instagram.com/unics_gamedev/"><Instagram /></a>
                        <a href="https://www.facebook.com/UniCsGameDev/"><Facebook /></a>
                        <a href="https://gitlab.cs.man.ac.uk/unics-game-development/"><Gitlab /></a>
                        <br />
                        <span className="d-none d-lg-block d-xl-block">Coded with <HeartFilled /> by GameDev! | UniCS GameDev © 2020</span>
                        <span className="d-lg-none d-xl-none">UniCS GameDev © 2020</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}