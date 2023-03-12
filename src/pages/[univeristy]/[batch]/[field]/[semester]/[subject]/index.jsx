// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from "@/config/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Subject({ data }) {
  // console.log("🚀 ~ file: index.jsx:7 ~ University ~ data:", data)
  const router = useRouter();

  const { univeristy, batch, field, semester, subject } = router.query;
  const Data = data.filter(
    (item) =>
      item?.univeristy?.selecteduniveristy?.slug?.current === univeristy &&
      item?.batch?.selectedbatch?.slug.current === batch &&
      item?.field?.selectedarea?.slug.current === field &&
      item?.semester?.selectedsemester?.slug?.current === semester &&
      item?.subject?.selectedsubject?.slug?.current === subject
  );

  const uniqueSubject = [];
  
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
    <title>{subject}</title>

    </Head>
      <h2 className="text-center capitalize font-serif font-normal text-4xl mt-6 ">
        {uniqueSubject[0]?.subject?.selectedsubject?.subject}  {uniqueSubject[0]?.subject_code}
      </h2>
      <div className="container mx-auto px-3 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <a
          href={uniqueSubject[0]?.syllabus}
          className="subject_details_card flex justify-center items-center flex-col"
          download={`Syllabus-${uniqueSubject[0]?.subject_code}`}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/images/book-open.png"
            alt="logo"
            width={60}
            height={60}
            className="opacity-60"
          />
          <h3 className="font-bold text-2xl mt-2">Syllabus</h3>
        </a>

        <Link
          href={`${router.asPath}/question-paper`}
          className="subject_details_card flex justify-center items-center flex-col"
        >
          <Image
            src="/images/questionmark.png"
            alt="logo"
            width={60}
            height={60}
          />
          <h3 className="font-bold text-2xl mt-2">Question Papers</h3>
        </Link>

        <Link
          href={`${router.asPath}/notes`}
          className="subject_details_card flex justify-center items-center flex-col"
        >
          <Image src="/images/pdf.png" alt="logo" width={60} height={60} />
          <h3 className="font-bold text-2xl mt-2">Notes</h3>
        </Link>

        <Link
          href={`${router.asPath}/youtube-lecture`}
          className="subject_details_card flex justify-center items-center flex-col"
        >
          <Image src="/images/youtube.png" alt="logo" width={60} height={60} />
          <h3 className="font-bold text-2xl mt-2">Youtube Lectures</h3>
        </Link>

        <Link
          href={`${router.asPath}/qurstion-papers-answered`}
          className="subject_details_card flex justify-center relative items-center flex-col"
        >
          <Image src="/images/circle-1.png" alt="logo" width={60} height={60} />
          <h3 className="font-bold text-2xl mt-2">Question Papers Answered</h3>
          <div className="bg-[#FF067C] text-white font-light text-base px-3 absolute rounded-tl-md top-0 left-0 py-1">
            EXCLUSIVE
          </div>
        </Link>
      </div>
    </>
  );
}

export const getStaticProps = async (pageContext) => {
  const query = ` *[ _type == "subject"]{
    slug,
    subject_code,
    syllabus,
    questionpapers[]{
      pdf_file,
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


export async function getStaticPaths() {
  const paths = [];
  return {
    paths,
    fallback: 'blocking',
  };
}
