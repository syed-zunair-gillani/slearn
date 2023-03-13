import { Footer, Header } from '@/components/imports'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  return (
    <>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}
