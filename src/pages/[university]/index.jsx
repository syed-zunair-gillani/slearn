// pages/[category]/[product]/[productId].js
import { Client } from '@/config/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function University() {
  const router = useRouter();
  const { category, product, productId } = router.query;

  // Fetch product data based on the parameters
  // ...

  return (
    <>
      <Link href={`${router.asPath}/2019`} className='bg-red-200 p-2'>Go to 2019</Link>
      <Link href={`${router.asPath}/2018`} className='bg-red-200 p-2'>Go to 2018</Link>
    </>
  );
}


export async function getServerSideProps({ params }) {
  console.log("🚀 ~ file: index.jsx:21 ~ getServerSideProps ~ params:", params)
  
  return {
    props: {
      product:[],
    },
  };
}
