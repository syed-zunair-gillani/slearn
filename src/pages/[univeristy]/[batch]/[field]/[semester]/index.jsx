// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from "@/config/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Semester({ data }) {
  // console.log("🚀 ~ file: index.jsx:7 ~ University ~ data:", data)
  const router = useRouter();
  console.log("🚀 ~ file: index.jsx:10 ~ Fields ~ router:", router);
  const { univeristy, batch, field , semester} = router.query;
  const Data = data.filter(
    (item) =>
      item?.univeristy?.selecteduniveristy?.slug?.current === univeristy &&
      item?.batch?.selectedbatch?.slug.current === batch &&
      item?.field?.selectedarea?.slug.current === field &&
      item?.semester?.selectedsemester?.slug?.current === semester
  );
  // console.log("🚀 ~ file: index.jsx:11 ~ Fields ~ Data:", Data);

  const uniqueSubject = [];
  // console.log(
  //   "🚀 ~ file: index.jsx:14 ~ University ~ uniqueData:",
  //   uniqueSubject
  // );
  Data.map((item) => {
    var findItem = uniqueSubject.find(
      (x) =>
        x?.subject?.selectedsubject?.slug.current ===
        item?.subject?.selectedsubject?.slug.current
    );
    if (!findItem) uniqueSubject.push(item);
  });

  return (
    <>
    <Head>
    <title>{semester}</title>

    </Head>
      <h2 className="text-center font-normal text-3xl my-5 text-red-500 ">Subjects</h2>
      <div className="nmrk_sem_title_underline"/>
      <div className="max-w-[1280px] mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        {uniqueSubject.map((field, idx) => {
          return (
            <Link
              href={`${router.asPath}/${field?.subject?.selectedsubject?.slug.current}`}
              key={idx}
              className="cse_card"
            >
              <h3 className="font-bold capitalize text-2xl mt-2">
                {field?.subject?.selectedsubject?.subject}
              </h3>
              <p className="mt-2 text-gray-500">{field?.subject_code}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export const getStaticProps = async (pageContext) => {
  const query = ` *[ _type == "subject"]{
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
    },
    subject{
      selectedsubject->{
        subject,
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
