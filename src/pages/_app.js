import { Footer, Header } from '@/components/imports'
import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar';


export default function App({ Component, pageProps }) {

  return (
    <>
      <NextNProgress />
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}
