import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Link from "next/link";
import { Main } from "@/components/imports";
import { sanityClient } from "@/config/client";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ university }) {
  return (
    <>
      <Head>
        <title>Slearn - Invest in Yourself</title>
        <meta
          name="description"
          content="sLearn is a Learning Platform and Provides Online Video Lectures, Tutorials and Engineering Courses. Made By Tenmark and Powered by Marklane"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:url" content="https://slearn.net/" />
        <link rel="canonical" href="https://slearn.net/" />
        <meta
          name="description"
          content="sLearn is a Learning Platform and Provides Online Video Lectures, Tutorials and Engineering Courses. Made By Tenmark and Powered by Marklane"
        />
        <meta
          property="og:description"
          content="sLearn is a Learning Platform and Provides Online Video Lectures, Tutorials and Engineering Courses."
        />
        <meta
          name="twitter:description"
          content="sLearn is a Learning Platform and Provides Online Video Lectures, Tutorials and Engineering Courses."
        />
        <meta property="og:title" content="sLearn - Invest in Yourself" />
        <meta name="twitter:title" content="sLearn - Invest in Yourself" />
        <meta name="robots" content="max-image-preview:large" />
        <meta property="og:site_name" content="sLearn" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/slearn-logo.png" />
        <meta property="og:image:secure_url" content="/slearn-logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="/slearn-logo.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/slearn-logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/slearn-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/slearn-logo.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/slearn-logo.png" />
        <link href="/slearn-logo.png" rel="icon" sizes="192x192" />
        <link href="/slearn-logo.png" rel="icon" sizes="128x128" />
        <meta name="apple-mobile-web-app-title" content="sLearn" />
        <meta name="application-name" content="sLearn" />
        <meta
          property="article:published_time"
          content="2019-12-06T21:45:23+00:00"
        />
        <meta
          property="article:modified_time"
          content="2022-04-16T15:29:38+00:00"
        />
      </Head>

      <Main data={university} />
    </>
  );
}

export const getStaticProps = async (pageContext) => {
  const query = ` *[ _type == "university"]{
    university_name,
    slug,
    icon{
      asset->{
        url
      }
    }
  }`;

  const university = await sanityClient.fetch(query);
  if(university.length >= 1){
    return {
      props: {
        university,
      },
    };
  }else{
    return{
      notFound: true,
    }
  }
  
};
