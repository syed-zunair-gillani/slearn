// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from '@/config/client';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function University({data}) {
  const router = useRouter();
  const { univeristy } = router.query;
  const Data  = data.filter((item)=>item?.univeristy?.selecteduniveristy?.slug?.current === univeristy)
    
  const uniqueData = [];
  Data.map((item) => {
    var findItem = uniqueData.find((x) => x?.batch?.selectedbatch?.year === item?.batch?.selectedbatch?.year);
    if (!findItem) uniqueData.push(item);
  });


  return (
    <>
    <Head>
     <title>{univeristy}</title>
    </Head>
    <h2 className="text-center font-bold text-3xl my-10">Batch</h2>

    <div className='container mx-auto px-4 py-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {
        uniqueData.map((uni,idx)=>{
          return(
            <Link href={`${router.asPath}/${uni?.batch?.selectedbatch?.slug.current}`} key={idx} className="flex border border-gray-100 justify-center items-center flex-col shadow-md rounded-lg py-20 hover:shadow-lg">
              <h3 className='font-bold text-2xl mt-2'>{uni?.batch?.selectedbatch?.year}</h3>
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