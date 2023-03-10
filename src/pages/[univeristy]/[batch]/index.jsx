// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from "@/config/client";
import NotFound from "@/pages/404";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Batch({ data }) {
  // console.log("🚀 ~ file: index.jsx:7 ~ University ~ data:", data)
  const router = useRouter();
  const { univeristy, batch } = router.query;
  const Data = data.filter(
    (item) =>
      item?.univeristy?.selecteduniveristy?.slug?.current === univeristy &&
      item?.batch?.selectedbatch?.slug.current === batch
  );
  console.log("🚀 ~ file: index.jsx:11 ~ Fields ~ Data:", Data);

  const uniqueFields = [];
  console.log(
    "🚀 ~ file: index.jsx:14 ~ University ~ uniqueData:",
    uniqueFields
  );
  Data.map((item) => {
    var findItem = uniqueFields.find(
      (x) =>
        x?.field?.selectedarea?.slug.current ===
        item?.field?.selectedarea?.slug.current
    );
    if (!findItem) uniqueFields.push(item);
  });

  return (
    <>
      <Head>
        <title>{batch}</title>
      </Head>
      {uniqueFields.length === 0 ? (
        <NotFound />
      ) : (
        <>
          <div className="container mx-auto px-3 mb-5 mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {uniqueFields.map((field, idx) => {
              return (
                <Link
                  href={`${router.asPath}/${field?.field?.selectedarea?.slug.current}`}
                  key={idx}
                  className="flex justify-center border border-gray-100 items-center flex-col shadow rounded-lg py-[62px]"
                >
                  <Image
                    src={field.field?.selectedarea?.icon}
                    alt="logo"
                    width={80}
                    height={80}
                  />
                  <h3 className="font-bold text-2xl mt-2">
                    {field?.field?.selectedarea?.field}
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
        icon,
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
