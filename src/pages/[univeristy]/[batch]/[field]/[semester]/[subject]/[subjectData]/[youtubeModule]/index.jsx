// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from "@/config/client";
import Image from "next/image";
import { useStete } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function YoutubeModule({ data }) {
  const router = useRouter();
  const [open, setOpen] = useState(null);

  const {
    univeristy,
    batch,
    field,
    semester,
    subject,
    subjectData,
    youtubeModule,
  } = router.query;

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

  const module =
    youtubeModule.charAt(0).toUpperCase() +
    youtubeModule.slice(1).replace(/-/g, " ");

  const yt = uniqueSubject[0]?.youtube_lecture;

  const ytData = yt.filter((item) => item?.selectedmodule?.name === module);

  const handleYt = (id) => {
    if (open === id) {
      return setOpen(null);
    }
    setOpen(id);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-32 flex gap-8">
        <div className="w-4/6 flex flex-col gap-5 mt-8">
          {ytData.map((item, idx) => {
            return (
              <>
                <div
                  className="bg-gray-50 boder border-gray-100 p-5 rounded-md shadow-md font-semibold text-2xl cursor-pointer"
                  onClick={() => handleYt(idx)}
                  key={idx}
                >
                  {item?.title}
                </div>

                <div
                  className={`p-10 bg-gray-100 overflow-hidden transition-all duration-300 ease-in-out rounded-md ${
                    open === idx ? "h-full block" : "h-0 hidden"
                  }`}
                >
                  <div className="video-responsive">
                    <iframe
                      width="420"
                      height="315"
                      src="http://www.youtube.com/embed/6xisazZX9bA"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="w-2/6 flex flex-col justify-top items-center p-8">
          <Image src="/images/logos.png" alt="logo" width={500} height={300} />
          <div className="pt-1 bg-gray-500 w-28 my-10" />
          <Image
            src="/images/sidebarbg.png"
            alt="logo"
            width={500}
            height={300}
          />
        </div>
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
    youtube_lecture[]{
      link,
      title,
      selectedmodule->{
        name
      },
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
