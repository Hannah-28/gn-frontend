import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? 'IMAGE UPLOAD | ' + title : 'IMAGE UPLOAD '}</title>
        <meta name="description" content="Image Upload" />
        <link
          rel="icon"
          href="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
        />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-20 justify-between fixed top-0 shadow-md items-center px-2 md:px-4 w-full z-50 bg-black text-white">
            <Link href="/">
              <Image
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Logo"
                width={30}
                height={30}
              />
            </Link>
            <div className="space-x-3 md:space-x-4 text-xs md:text-base">
              <Link href="/" legacyBehavior>
                <a className="mover">Home</a>
              </Link>
              <Link href="/register" legacyBehavior>
                <a className="mover">Register</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="children">
          <div className="w-full mx-auto px-0">{children}</div>
        </main>
      </div>
    </>
  );
}
