// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from "@/config/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Subject({ data }) {
  // console.log("🚀 ~ file: index.jsx:7 ~ University ~ data:", data)
  const router = useRouter();

  console.log("🚀 ~ file: index.jsx:10 ~ Fields ~ router:", router);
  const { univeristy, batch, field, semester, subject } = router.query;
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
    "🚀 ~ file: index.jsx:23 ~ Subject ~ uniqueSubject:",
    uniqueSubject
  );
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
      <h2 className="text-center capitalize font-serif font-normal text-3xl mt-20 ">
        {uniqueSubject[0]?.subject?.selectedsubject?.subject}{" "}
        {uniqueSubject[0]?.subject_code}
      </h2>
      <div className="container mx-auto px-4 py-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <a
          href={uniqueSubject[0]?.syllabus?.asset?.url}
          className="flex justify-center items-center flex-col shadow-md rounded-lg py-20 hover:shadow-lg"
          download={`Syllabus-${uniqueSubject[0]?.subject_code}`}
        >
          <Image
            src="/images/book-open.png"
            alt="logo"
            width={80}
            height={80}
            className="opacity-60"
          />
          <h3 className="font-bold text-2xl mt-2">Syllabus</h3>
        </a>

        <Link
          href={`${router.asPath}/question-paper`}
          className="flex justify-center items-center flex-col shadow-md rounded-lg py-20 hover:shadow-lg"
        >
          <Image
            src="/images/questionmark.png"
            alt="logo"
            width={80}
            height={80}
          />
          <h3 className="font-bold text-2xl mt-2">Question Papers</h3>
        </Link>

        <Link
          href={`${router.asPath}/notes`}
          className="flex justify-center items-center flex-col shadow-md rounded-lg py-20 hover:shadow-lg"
        >
          <Image src="/images/pdf.png" alt="logo" width={80} height={80} />
          <h3 className="font-bold text-2xl mt-2">Notes</h3>
        </Link>

        <Link
          href={`${router.asPath}/youtube-lecture`}
          className="flex justify-center items-center flex-col shadow-md rounded-lg py-20 hover:shadow-lg"
        >
          <Image src="/images/youtube.png" alt="logo" width={80} height={80} />
          <h3 className="font-bold text-2xl mt-2">Youtube Lectures</h3>
        </Link>

        <Link
          href={`${router.asPath}/qurstion-papers-answered`}
          className="flex relative justify-center items-center flex-col shadow-md rounded-lg py-20 hover:shadow-lg"
        >
          <Image src="/images/circle-1.png" alt="logo" width={80} height={80} />
          <h3 className="font-bold text-2xl mt-2">Question Papers Answered</h3>
          <div className="bg-[#FF067C] text-white font-light text-base px-4 absolute rounded-tl-lg top-0 left-0 py-1">
            EXCLUSIVE
          </div>
        </Link>
      </div>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = ` *[ _type == "subject"]{
    slug,
    subject_code,
    syllabus{
      asset->{
        url
      }
    },
    questionpapers[]{
      pdf_file{
        asset->{
          url
        }
      },
      selectedyear->{
        year
      },
      title,
    },
    driveFolder[]{
      link
    },
    notes[]{
      link,
      notestype,
      selectedmodule->{
        name
      },
      type,
    },
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
