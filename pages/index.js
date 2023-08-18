import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="Home">
      <div className="w-full">
        <div className="w-full front-picture mx-auto text-white grid justify-center items-center">
          <div className="mx-8">
            <Link
              href="/register"
              className="text-xs md:text-base text-black hover:bg-slate-100 px-7 py-3 rounded-md bg-white font-medium"
            >
              REGISTER
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
