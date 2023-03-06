// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from "@/config/client";
import Image from "next/image";
import { useStete } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Subject({ data }) {
  console.log("🚀 ~ file: index.jsx:10 ~ Subject ~ data:", data)
  // console.log("🚀 ~ file: index.jsx:7 ~ University ~ data:", data)
  const router = useRouter();

  const { univeristy, batch, field, semester, subject, subjectData } =
    router.query;

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

  let uniqueYear = uniqueSubject[0]?.questionpapers
    .map((item) => item?.selectedyear?.year)
    .filter((value, index, self) => self.indexOf(value) === index);

  let uniqueModule = uniqueSubject[0]?.notes
    .map((item) => item?.selectedmodule?.name)
    .filter((value, index, self) => self.indexOf(value) === index);

  let uniqueModuleForYt = uniqueSubject[0]?.youtube_lecture
    .map((item) => item?.selectedmodule?.name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const { notes } = uniqueSubject[0];

  return (
    <>

    <div className="container mx-auto px-4 py-32 flex gap-8">
      <div className="w-4/6">

      {subjectData === "question-paper" && (
        <QuestionPaper data={uniqueSubject[0]} uniqueYear={uniqueYear} />
      )}
      {subjectData === "notes" && (
        <Notes data={uniqueSubject[0]} uniqueModule={uniqueModule} />
      )}
      {subjectData === "youtube-lecture" && (
        <YoutubeLecture data={uniqueSubject[0]} uniqueModuleForYt={uniqueModuleForYt} />
      )}
      {subjectData === "qurstion-papers-answered" && (
        <QuestionAnwerPaper data={subjectData} />
      )}
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

const QuestionPaper = ({ data, uniqueYear }) => {
  const { questionpapers, subject_code, subject, batch } = data;
  console.log(
    "🚀 ~ file: index.jsx:47 ~ QuestionPaper ~ uniqueYear:",
    uniqueYear,
    data
  );
  const [open, setOpen] = useState(null);
  console.log("🚀 ~ file: index.jsx:53 ~ QuestionPaper ~ open:", open);

  const handleOpen = (id) => {
    if (id === open) {
      return setOpen(null);
    }
    setOpen(id);
  };

  return (
    <>
      <h2 className="capitalize text-center text-2xl md:text-4xl font-serif mt-8 font-medium">
        {subject?.selectedsubject?.subject} {subject_code} Question Papers
      </h2>
      <h2 className="uppercase text-center text-2xl mb-20 text-gray-500 mt-7 font-bold">
        {batch?.selectedbatch?.year} batch
      </h2>

      
        <div>
          {uniqueYear.map((year) => (
            <div key={year}>
              <h2 className="text-2xl text-center py-6 font-bold mb-4">
                {year}
              </h2>
              {questionpapers
                .filter((item) => item?.selectedyear?.year === year)
                .map((qp, idx) => {
                  return (
                    <div
                      className={`p-5 shadow-md border border-gray-200 mb-6 overflow-hidden transition-all duration-300 ease-in-out cursor-pointer rounded-lg ${
                        open === `${idx}${year}` ? "h-[200px]" : "h-[80px]"
                      }`}
                      key={idx}
                      onClick={() => handleOpen(`${idx}${year}`)}
                    >
                      <p className="text-xl font-bold py-2">{qp.title}</p>
                      <div className="mt-10 mb-5 flex justify-center items-center">
                        <a
                          className="bg-blue-500 p-3 px-7 rounded-xl font-semibold text-white shadow-xl"
                          href={qp?.pdf_file?.asset.url}
                          download
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
        
    
    </>
  );
};

const Notes = ({ data, uniqueModule }) => {
  const { notes, subject_code, subject, batch } = data;
  console.log("🚀 ~ file: index.jsx:156 ~ Notes ~ data:", data)
  const [openModue, setOpenModule] = useState(null);
  const [openModueInner, setOpenModueInner] = useState(null);
  let count = 0;
  const HandleNotes = (id) => {
    if (id === openModue) return setOpenModule(null);
    setOpenModule(id);
  };
  const HandleNotesInner = (id) => {
    if (id === openModueInner) return setOpenModueInner(null);
    setOpenModueInner(id);
  };

  return (
    <>
      <h2 className="capitalize text-center text-2xl md:text-4xl font-serif mt-8 font-medium">
        {subject?.selectedsubject?.subject} {subject_code} Notes
      </h2>
      <h2 className="uppercase text-center text-2xl mb-20 text-gray-500 mt-7 font-bold">
        {batch?.selectedbatch?.year} batch
      </h2>
      
        <div>
          {uniqueModule.map((module, i) => {
            count++;
            return (
              <div key={i}>
                <h3
                  onClick={() => HandleNotes(module + i)}
                  className="font-semibold text-center text-2xl bg-gray-300 p-4 rounded-md mb-5 cursor-pointer"
                  key={i}
                >{`Module ${count}`}</h3>
                <div
                  onClick={() => HandleNotesInner(`${i}${i}bank`)}
                  className={`shadow-md border cursor-pointer font-bold text-xl text-center text-red-500 border-gray-200 p-4 mb-3 rounded-md ${
                    module + i === openModue ? "block" : "hidden"
                  }`}
                >
                  {count} - Bank
                </div>
                <div
                  className={`${
                    openModueInner === `${i}${i}bank` ? "block" : "hidden"
                  }`}
                >
                  <div className="my-10">
                    <h3 className="text-2xl text-gray-800 text-center underline">
                      Class Notes
                      <div className="flex justify-center items-center flex-col gap-4 my-8">
                        {notes
                          .filter(
                            (item) =>
                              item?.type === "qbank" &&
                              item?.notestype === "classnotes" &&
                              item?.selectedmodule?.name === module
                          )
                          .map((classNotes, id) => {
                            return (
                              <div key={id} className="bg-gray-50 p-3 px-8 rounded-3xl border border-gray-200 shadow-md hover:shadow-xl ">
                                <a
                                  href={classNotes?.link}
                                  download
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Download
                                </a>
                              </div>
                            );
                          })}
                      </div>
                    </h3>
                    <h3 className="text-2xl text-gray-800 text-center underline">
                      Printed Notes
                      <div className="flex justify-center items-center flex-col gap-4 my-8">
                        {notes
                          .filter(
                            (item) =>
                              item?.type === "qbank" &&
                              item?.notestype === "printednotes" &&
                              item?.selectedmodule?.name === module
                          )
                          .map((classNotes, id) => {
                            return (
                              <div key={id} className="bg-gray-50 p-3 px-8 rounded-3xl border border-gray-200 shadow-md hover:shadow-xl ">
                                <a
                                  href={classNotes?.link}
                                  download
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Download
                                </a>
                              </div>
                            );
                          })}
                      </div>
                    </h3>
                  </div>
                </div>
                <div
                  onClick={() => HandleNotesInner(`${i}${i}asset`)}
                  className={`shadow-md border cursor-pointer font-bold text-xl text-center text-red-500 border-gray-200 p-4 mb-3 rounded-md ${
                    module + i === openModue ? "block" : "hidden"
                  }`}
                >
                  {count} - Assets
                </div>


                <div
                  className={`${
                    openModueInner === `${i}${i}asset` ? "block" : "hidden"
                  }`}
                >



                  <div className="flex justify-center items-center flex-col gap-4 my-8">
                    {notes
                      .filter(
                        (item) =>
                          item?.type === "assist" &&
                          item?.selectedmodule?.name === module
                      )
                      .map((classNotes, id) => {
                        return (
                          <div key={id} className="bg-gray-50 p-3 px-8 rounded-3xl border border-gray-200 shadow-md hover:shadow-xl ">
                            <a href={classNotes?.link} download target="_blank" rel="noreferrer">
                              Download
                            </a>
                          </div>
                        );
                      })}
                  </div>


                </div>
              </div>
            );
          })}
        </div>
    </>
  );
};

const YoutubeLecture = ({ data, uniqueModuleForYt }) => {
  const router = useRouter()
  const { notes, subject_code, subject, batch } = data;
  console.log("🚀 ~ file: index.jsx:303 ~ YoutubeLecture ~ data:", data)

  return (
    <>
      <h2 className="capitalize text-center text-2xl md:text-4xl font-serif mt-8 mb-16 font-medium">
        {subject?.selectedsubject?.subject} {subject_code} Youtube Lecture
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {
          uniqueModuleForYt.map((item,idx)=>{
            return(
              <Link href={`${router.asPath}/module-${idx+1} `} key={idx} className="flex border border-gray-100 justify-center items-center flex-col shadow-md rounded-lg py-20 hover:shadow-lg">
              <h3 className='font-bold text-2xl mt-2'>{item}</h3>
            </Link>
            )
          })
        }
    
      </div>
      </>  
  );
};

const QuestionAnwerPaper = ({ data }) => {
  return (
   
      <div className="w-2/6 bg-green-100">sidebar</div>

  );
};

const NotFound = () => {
  return <div className="mt-40 font-bold text-4xl">Not Found</div>;
};

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
