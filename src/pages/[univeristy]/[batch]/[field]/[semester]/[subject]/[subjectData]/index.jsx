// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from "@/config/client";
import Image from "next/image";
import { useStete } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import NotFound from "@/pages/404";
import Head from "next/head";

export default function Subject({ data }) {
  console.log("🚀 ~ file: index.jsx:10 ~ Subject ~ data:", data);
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
    ?.map((item) => item?.selectedyear?.year)
    .filter((value, index, self) => self.indexOf(value) === index);

  let uniqueYearForQPA = uniqueSubject[0]?.questionpapersanswer
    ?.map((item) => item?.selectedyear?.year)
    .filter((value, index, self) => self.indexOf(value) === index);

  let uniqueModule = uniqueSubject[0]?.notes
    ?.map((item) => item?.selectedmodule?.name)
    .filter((value, index, self) => self.indexOf(value) === index);

  let uniqueModuleForYt = uniqueSubject[0]?.youtube_lecture
    ?.map((item) => item?.selectedmodule?.name)
    ?.filter((value, index, self) => self.indexOf(value) === index);

  // const { notes } = uniqueSubject[0];

  return (
    <>
      <Head>
        <title>{subjectData}</title>
      </Head>

      {subjectData === "question-paper" && (
        <QuestionPaper data={uniqueSubject[0]} uniqueYear={uniqueYear} />
      )}
      {subjectData === "notes" && (
        <Notes data={uniqueSubject[0]} uniqueModule={uniqueModule} />
      )}
      {subjectData === "youtube-lecture" && (
        <YoutubeLecture
          data={uniqueSubject[0]}
          uniqueModuleForYt={uniqueModuleForYt}
        />
      )}
      {subjectData === "qurstion-papers-answered" && (
        <QuestionAnwerPaper
          data={uniqueSubject[0]}
          uniqueYear={uniqueYearForQPA}
        />
      )}
    </>
  );
}

const QuestionPaper = ({ data, uniqueYear }) => {
  const { questionpapers, subject_code, subject, batch } = data;

  const [open, setOpen] = useState(null);

  const handleOpen = (id) => {
    if (id === open) {
      return setOpen(null);
    }
    setOpen(id);
  };

  return (
    <>
      <div className="container mx-auto px-3 py-6 md:flex gap-8">
        <div className="md:w-4/6 border-r-[1px] border-gray-100 pr-12">
          <h2 className="capitalize text-center text-2xl md:text-4xl font-serif mt-8 font-medium">
            {subject?.selectedsubject?.subject} {subject_code} Question Papers
          </h2>
          <h2 className="uppercase text-center text-2xl mb-20 text-gray-500 mt-7 font-bold">
            {batch?.selectedbatch?.year} batch
          </h2>

          <div>
            {uniqueYear?.map((year) => (
              <div key={year}>
                <h2 className="text-2xl text-center py-6 font-bold mb-4">
                  {year}
                </h2>
                {questionpapers
                  .filter((item) => item?.selectedyear?.year === year)
                  .map((qp, idx) => {
                    return (
                      <div
                        className={`p-5 shadow-md border border-gray-200 mb-6 overflow-hidden transition-all duration-300 ease-in-out cursor-pointer rounded-lg 
                      `}
                        key={idx}
                      >
                        <p
                          className={`text-xl font-bold py-2`}
                          onClick={() => handleOpen(`${idx}${year}`)}
                        >
                          {qp.title}
                        </p>
                        <div
                          className={`mt-10 mb-5 flex justify-center transition-all duration-500 ease-in-out items-center ${
                            open === `${idx}${year}` ? "block" : "hidden"
                          }`}
                        >
                          <a
                            className={`bg-blue-500 p-3 px-7 rounded-xl font-semibold text-white shadow-xl`}
                            href={qp?.pdf_file}
                            download
                            target="_blank"
                            rel="noreferrer"
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
        </div>

        <div className="md:w-2/6 flex flex-col justify-top items-center px-6">
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
};

const Notes = ({ data, uniqueModule }) => {
  const { notes, subject_code, subject, batch, driveFolder } = data;

  const [openModue, setOpenModule] = useState(null);
  const [openFolder, setOpenFolder] = useState(false);
  const [openModueInner, setOpenModueInner] = useState(null);
  let count = 0;
  const HandleNotes = (id) => {
    if (id === openModue){
      setOpenModueInner(null);
      return setOpenModule(null)
    };
    setOpenModule(id);
    setOpenModueInner(null);
  };
  const HandleNotesInner = (id) => {
    if (id === openModueInner) return setOpenModueInner(null);
    setOpenModueInner(id);
  };

  const openDriveFolder = () => {
    setOpenFolder(!openFolder);
  };

  return (
    <>
      <div className="container mx-auto px-3 py-6 md:flex gap-8">
        <div className="md:w-4/6 border-r-[1px] border-gray-100 pr-12">
          <h2 className="capitalize text-center text-2xl md:text-4xl font-serif mt-8 font-medium">
            {subject?.selectedsubject?.subject} {subject_code} Notes
          </h2>
          <h2 className="uppercase text-center text-2xl mb-20 text-gray-500 mt-7 font-bold">
            {batch?.selectedbatch?.year} batch
          </h2>

          <div>
            {uniqueModule?.map((module, i) => {
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
                                <div
                                  key={id}
                                  className="bg-gray-50 p-3 px-8 rounded-3xl border border-gray-200 shadow-md hover:shadow-xl "
                                >
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
                                <div
                                  key={id}
                                  className="bg-gray-50 p-3 px-8 rounded-3xl border border-gray-200 shadow-md hover:shadow-xl "
                                >
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
                            <div
                              key={id}
                              className="bg-gray-50 p-3 px-8 rounded-3xl border border-gray-200 shadow-md hover:shadow-xl "
                            >
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
                  </div>
                </div>
              );
            })}
          </div>

          <section>
            <div
              className="border border-gray-200 bg-white shadow p-5 rounded-md text-center font-bold cursor-pointer text-xl"
              onClick={() => openDriveFolder(1)}
            >
              Drive Folder
            </div>
            {openFolder && (
              <div className="flex flex-col justify-center items-center gap-4 my-5">
                {driveFolder.map((link, id) => {
                  return (
                    <div
                      key={id}
                      className="bg-gray-50 p-3 px-8 rounded-3xl border border-gray-200 shadow-md hover:shadow-xl "
                    >
                      <a
                        href={link?.link}
                        download
                        target="_blank"
                        rel="noreferrer"
                      >
                        Folder {id + 1}
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
        <div className="md:w-2/6 flex flex-col justify-top items-center px-6">
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
};

const YoutubeLecture = ({ data, uniqueModuleForYt }) => {
  const router = useRouter();
  const { notes, subject_code, subject, batch } = data;

  return (
    <>
    <div className="container mx-auto px-3 py-6 ">
      <h2 className="capitalize text-center text-2xl md:text-4xl font-serif mt-8 mb-16 font-medium">
        {subject?.selectedsubject?.subject} {subject_code} Youtube Lecture
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {uniqueModuleForYt.length >= 1 ? (
          uniqueModuleForYt?.map((item, idx) => {
            return (
              <Link
                href={`${router.asPath}/module-${idx + 1} `}
                key={idx}
                className="flex border border-gray-100 justify-center items-center flex-col shadow-md rounded-lg py-20 hover:shadow-lg"
              >
                <h3 className="font-bold text-2xl mt-2">{item}</h3>
              </Link>
            );
          })
        ) : (
          <NotFound />
        )}
      </div>
      </div>
    </>
  );
};

const QuestionAnwerPaper = ({ data, uniqueYear }) => {
  const { questionpapersanswer, subject_code, subject, batch } = data;
  console.log(
    "🚀 ~ file: index.jsx:378 ~ QuestionAnwerPaper ~ questionpapersanswer:",
    questionpapersanswer
  );

  const [open, setOpen] = useState(null);

  const handleOpen = (id) => {
    if (id === open) {
      return setOpen(null);
    }
    setOpen(id);
  };

  return (
    <>
      <div className="container mx-auto px-3 py-6 md:flex gap-8">
        <div className="md:w-4/6 border-r-[1px] border-gray-100 pr-12">
          <h2 className="capitalize text-center text-2xl md:text-4xl font-serif mt-8 font-medium">
            {subject?.selectedsubject?.subject} {subject_code} Question Papers
            Answer
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
                {questionpapersanswer
                  .filter((item) => item?.selectedyear?.year === year)
                  .map((qp, idx) => {
                    return (
                      <div
                        className={`p-5 shadow-md border border-gray-200 mb-6 overflow-hidden cursor-pointer rounded-lg `}
                        key={idx}
                        onClick={() => handleOpen(`${idx}${year}`)}
                      >
                        <p className="text-xl font-bold py-2">{qp.title}</p>
                        <div
                          className={`mt-10 mb-5 flex justify-center items-center ${
                            open === `${idx}${year}` ? "block" : "hidden"
                          }`}
                        >
                          <a
                            className="bg-blue-500 p-3 px-7 rounded-xl font-semibold text-white shadow-xl"
                            href={qp?.pdf_file}
                            download
                            target="_blank"
                            rel="noreferrer"
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
        </div>
        <div className="md:w-2/6 flex flex-col justify-top items-center px-6">
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
};

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
    },
    questionpapersanswer[]{
      pdf_file,
      selectedyear->{
        year
      },
      title,
    },
    
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
    fallback: "blocking",
  };
}
