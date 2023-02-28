// pages/[category]/[product]/[productId].js
import { Client, sanityClient } from "@/config/client";
import Image from "next/image";
import {useStete} from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Subject({ data }) {
  // console.log("🚀 ~ file: index.jsx:7 ~ University ~ data:", data)
  const router = useRouter();

  const { univeristy, batch, field, semester, subject, subjectData } = router.query;

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

  let uniqueYear = uniqueSubject[0]?.questionpapers.map(item => item?.selectedyear?.year).filter((value, index, self) => self.indexOf(value) === index)

  const {notes} = uniqueSubject[0]
  
  return (
    <>
      {subjectData === "question-paper" && <QuestionPaper data={uniqueSubject[0]} uniqueYear={uniqueYear} />}
      {subjectData === "notes" && <Notes data={notes}/>}
      {subjectData === "youtube-lecture" && <YoutubeLecture data={subjectData}/>}
      {subjectData === "qurstion-papers-answered" && <QuestionAnwerPaper data={subjectData}/>}
    </>
  );
}

const QuestionPaper = ({data, uniqueYear}) => {
  const {questionpapers, subject_code, subject, batch} = data
  console.log("🚀 ~ file: index.jsx:47 ~ QuestionPaper ~ uniqueYear:", uniqueYear, data)
  const [open, setOpen] = useState(null)
  console.log("🚀 ~ file: index.jsx:53 ~ QuestionPaper ~ open:", open)

  const handleOpen = (id) =>{
    if(id === open){
      return setOpen(null)
    }
    setOpen(id)
  }

  return (
    <>
    <h2 className="capitalize text-center text-2xl md:text-4xl font-serif mt-20 font-medium">{subject?.selectedsubject?.subject} {subject_code} Question Papers</h2>
    <h2 className="uppercase text-center text-2xl text-gray-500 mt-7 font-bold">{batch?.selectedbatch?.year} batch</h2>
    
    <div className="container mx-auto px-4 my-20 flex gap-8">
      <div className="w-4/6">
      {
        uniqueYear.map((year)=>(
          
          questionpapers.filter((item)=>item?.selectedyear?.year === year).map((qp,idx)=>{
            return(
              <div className={`p-5 shadow-md border border-gray-200 mb-6 overflow-hidden transition-all duration-300 ease-in-out cursor-pointer rounded-lg ${open === `${idx}${year}` ? 'h-[200px]' : 'h-[80px]'}`} key={idx} onClick={()=>handleOpen(`${idx}${year}`)}>
                <p className="text-xl font-bold py-2">{qp.title}</p>
                <div className="mt-10 mb-5 flex justify-center items-center"><a className="bg-blue-500 p-3 px-7 rounded-xl font-semibold text-white shadow-xl" href={qp?.pdf_file?.asset.url} download>Download</a></div>
              </div>
            )
          })
        ))
      }
      </div>
      <div className="w-2/6 bg-green-100">sidebar</div>
    </div>
    </>
  );
};

const Notes = ({data}) => {
  return (
    <div className="container mx-auto px-4 py-32 flex gap-8">
      <div className="w-4/6 bg-blue-200"></div>
      <div className="w-2/6 bg-green-100">sidebar</div>
    </div>
  );
};

const YoutubeLecture = ({data}) => {
  return (
    <div className="container mx-auto px-4 py-32 flex gap-8">
      <div className="w-4/6 bg-blue-200">{data}</div>
      <div className="w-2/6 bg-green-100">sidebar</div>
    </div>
  );
};

const QuestionAnwerPaper = ({data}) => {
  return (
    <div className="container mx-auto px-4 py-32 flex gap-8">
      <div className="w-4/6 bg-blue-200">{data}</div>
      <div className="w-2/6 bg-green-100">sidebar</div>
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="mt-40 font-bold text-4xl">
      Not Found
    </div>
  );
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
