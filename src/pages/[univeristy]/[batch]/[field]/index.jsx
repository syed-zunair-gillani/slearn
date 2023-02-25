// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from "@/config/client";
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
    <h2 className="text-center font-bold text-3xl my-10">Semester</h2>

      <div className="container mx-auto px-4 py-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {uniqueSemester.map((field, idx) => {
          return (
            <Link
              href={`${router.asPath}/${field?.semester?.selectedsemester?.slug.current}`}
              key={idx}
              className="flex justify-center items-center flex-col shadow-md rounded-lg py-10 hover:shadow-lg"
            >
              <h3 className="font-bold text-2xl mt-2">
                {field?.semester?.selectedsemester?.semester}
              </h3>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = ` *[ _type == "subject"]{
    subject_name,
    slug,
    subject_code,
    syllabus{
      
    },
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
