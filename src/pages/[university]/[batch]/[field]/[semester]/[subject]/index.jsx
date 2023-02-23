// pages/[category]/[product]/[productId].js
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Subject() {
  const router = useRouter();
  const { category, product, productId } = router.query;

  // Fetch product data based on the parameters
  // ...

  return (
    <>
    Subject
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

