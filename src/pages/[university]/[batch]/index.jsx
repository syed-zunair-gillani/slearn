// pages/[category]/[product]/[productId].js
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Product() {
  const router = useRouter();
  const { category, product, productId } = router.query;

  // Fetch product data based on the parameters
  // ...

  return (
    <>
          <Link href={`${router.asPath}/s1`} className='bg-red-200 p-2'>Go to s1</Link>
          <Link href={`${router.asPath}/s3`} className='bg-red-200 p-2'>Go to s3</Link>
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

