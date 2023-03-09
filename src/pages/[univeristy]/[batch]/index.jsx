// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from '@/config/client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Batch({data}) {
  // console.log("🚀 ~ file: index.jsx:7 ~ University ~ data:", data)
  const router = useRouter();
  const { univeristy, batch } = router.query;
  const Data  = data.filter((item)=>item?.univeristy?.selecteduniveristy?.slug?.current === univeristy && item?.batch?.selectedbatch?.slug.current === batch)
  console.log("🚀 ~ file: index.jsx:11 ~ Fields ~ Data:", Data)
  
  const uniqueFields = [];
  console.log("🚀 ~ file: index.jsx:14 ~ University ~ uniqueData:", uniqueFields)
  Data.map((item) => {
    var findItem = uniqueFields.find((x) => x?.field?.selectedarea?.slug.current === item?.field?.selectedarea?.slug.current);
    if (!findItem) uniqueFields.push(item);
  });

  return (
    <>
    <Head>
    <title>{batch}</title>

    </Head>
    <h2 className="text-center font-bold text-3xl my-10">Area of Fields</h2>

    <div className='container mx-auto px-4 py-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {
        uniqueFields.map((field,idx)=>{
          return(
            <Link href={`${router.asPath}/${field?.field?.selectedarea?.slug.current}`} key={idx} className="flex justify-center border border-gray-100 items-center flex-col shadow-md rounded-lg py-20 hover:shadow-lg">
              <Image src={field.field?.selectedarea?.icon?.asset.url} alt="logo" width={80} height={80}/>  
              <h3 className='font-bold text-2xl mt-2'>{field?.field?.selectedarea?.field}</h3>
            </Link>
          )
        })
      }
    </div>
    </>
  );
}




export const getServerSideProps = async (pageContext) => {
  const query = ` *[ _type == "subject"]{
    subject_name,
    slug,
    subject_code,
    syllabus,
    questionpapers,
    notes[],
    univeristy{
      selecteduniveristy->{
        university_name,
        slug,
        icon{
          asset->{
            url
          }
        }
      }
    },
    batch{
      selectedbatch->{
        year,
        slug,
      }
    },
    field{
      selectedarea->{
        field,
        slug,
        icon{
          asset->{
            url
          }
        }
      }
    },
    semester{
      selectedsemester->{
        semester,
        slug,
      }
    }

  }`;

  const data = await sanityClient.fetch(query);
  return {
    props: {
      data
    },
  }
}; 