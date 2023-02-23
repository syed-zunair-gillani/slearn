export default {
  name: "subject",
  type: "document",
  title: "Subject",
  fields: [
    {
      name: "semester",
      type: "object",
      fields: [
        {
          title: "Select Semester",
          name: "selectedsemester",
          type: "reference",
          to: [{ type: "semester" }],
        },
      ],
    },
    {
      name: "subject_name",
      type: "string",
      title: "Subject Name",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "subject_name",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      name: "subject_code",
      type: "string",
      title: "Subject Code",
    },
    {
      title: "Syllabus",
      name: "syllabus",
      type: "file",
    },
    {
      title: "Question Papers",
      type: "array",
      name: "questionpapers",
      of: [
        {
          type: "object",
          name: "inline",
          fields: [
            {
              title: "Title",
              name: "title",
              type: "string",
            },
            {
               title: "Year",
               name: "year",
               type: "string",
             },
             {
               title: "PDF file",
               name: "pdf_file",
               type: "file",
             },
          ],
        },
      ],
    },
    {
     title: "Notes",
     type: "array",
     name: "notes",
     of: [
       {
         type: "object",
         name: "inline",
         fields: [
           {
             title: "Module",
             name: "module",
             type: "string",
           },
         ],
       },
     ],
   },


  ],
};
