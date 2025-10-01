import Head from 'next/head';
import "@/styles/globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* 소유권 확인 메타 태그 */}
        <meta name="google-site-verification" content="sCGiCDLue1FQPs4UWQOUkA6fxzRqB4mzAMlrDI3cdzY" />
        <meta name="naver-site-verification" content="3ec4655d6c135102889e65c91510b38dc1845bec" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
