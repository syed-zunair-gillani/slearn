// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from "@/config/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import NotFound from "../404";

export default function University({ data }) {
  const router = useRouter();
  const { univeristy } = router.query;
  const Data = data.filter(
    (item) => item?.univeristy?.selecteduniveristy?.slug?.current === univeristy
  );

  const uniqueData = [];
  Data.map((item) => {
    var findItem = uniqueData.find(
      (x) => x?.batch?.selectedbatch?.year === item?.batch?.selectedbatch?.year
    );
    if (!findItem) uniqueData.push(item);
  });

  return (
    <>
      <Head>
        <title>{univeristy}</title>
      </Head>
      {uniqueData.length === 0 ? (
        <NotFound />
      ) : (
        <section className=" container mx-auto ">
        <figure className="flex flex-col items-center">
        <Image src="/images/batch.png" alt="batch" width={400} height={100}/>
        </figure>
          

          <div className="px-3 py-5 flex justify-center items-center flex-wrap ">
            {uniqueData?.map((uni, idx) => {
              return (
                <Link
                  href={`${router.asPath}/${uni?.batch?.selectedbatch?.slug.current}`}
                  key={idx}
                  className="batchcard "
                >
                  <h3 className="font-bold text-2xl mt-2">
                    {uni?.batch?.selectedbatch?.year}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

export const getStaticProps = async (pageContext) => {
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
      data,
    },
  };
};


export async function getStaticPaths() {
  const paths = [];
  return {
    paths,
    fallback: 'blocking',
  };
}
