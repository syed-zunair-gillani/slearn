// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from "@/config/client";
import NotFound from "@/pages/404";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Fields({ data }) {
  // console.log("🚀 ~ file: index.jsx:7 ~ University ~ data:", data)
  const router = useRouter();
  const { univeristy, batch, field } = router.query;
  const Data = data.filter(
    (item) =>
      item?.univeristy?.selecteduniveristy?.slug?.current === univeristy &&
      item?.batch?.selectedbatch?.slug.current === batch &&
      item?.field?.selectedarea?.slug.current === field
  );

  const uniqueSemester = [];
  Data.map((item) => {
    var findItem = uniqueSemester.find(
      (x) =>
        x?.semester?.selectedsemester?.slug.current ===
        item?.semester?.selectedsemester?.slug.current
    );
    if (!findItem) uniqueSemester.push(item);
  });

  return (
    <>
      <Head>
        <title>{field}</title>
      </Head>
      {uniqueSemester.length === 0 ? (
        <NotFound />
      ) : (
        <>
          <h2 className="text-center font-normal text-3xl my-5 text-red-500 ">Semester</h2>
          <div className="nmrk_sem_title_underline"/>

          <div className="max-w-[1280px] mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
            {uniqueSemester.map((field, idx) => {
              return (
                <Link
                  href={`${router.asPath}/${field?.semester?.selectedsemester?.slug.current}`}
                  key={idx}
                  className="tnmrk_semester_card"
                >
                  <h3 className="font-bold text-2xl mt-2">
                    {field?.semester?.selectedsemester?.semester}
                  </h3>
                </Link>
              );
            })}
          </div>
        </>
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
