// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from "@/config/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Subject({ data }) {
  // console.log("🚀 ~ file: index.jsx:7 ~ University ~ data:", data)
  const router = useRouter();
  console.log("🚀 ~ file: index.jsx:10 ~ Fields ~ router:", router);
  const { univeristy, batch, field , semester, subject} = router.query;
  const Data = data.filter(
    (item) =>
      item?.univeristy?.selecteduniveristy?.slug?.current === univeristy &&
      item?.batch?.selectedbatch?.slug.current === batch &&
      item?.field?.selectedarea?.slug.current === field &&
      item?.semester?.selectedsemester?.slug?.current === semester &&
      item?.subject?.selectedsubject?.slug?.current === subject

  );
  console.log("🚀 ~ file: index.jsx:11 ~ Fields ~ Data:", Data);

  const uniqueSubject = [];
  console.log(
    "🚀 ~ file: index.jsx:14 ~ University ~ uniqueData:",
    uniqueSubject
  );
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
      <div className="container mx-auto px-4 py-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {uniqueSubject.map((field, idx) => {
          return (
            <h2 key={idx}>subject data</h2>
          );
        })}
      </div>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = ` *[ _type == "subject"]{
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
