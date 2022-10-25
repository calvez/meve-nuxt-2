import Link from '@docusaurus/Link'
import clsx from 'clsx'
import React from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          <em>The</em> Next.js WordPress Starter
        </h1>
        <p className="hero__subtitle">
          Build headless websites with this starter from WebDevStudios
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs">
            Get Started
          </Link>
          <a href="https://github.com/webdevstudios/nextjs-wordpress-starter/">
            <img
              alt="Github stars"
              height="20"
              loading="eager"
              src="https://img.shields.io/github/stars/webdevstudios/nextjs-wordpress-starter.svg?style=social&label=Stars&cache=Seconds=3600"
              width="82"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
