export default {
  name: "subject",
  type: "document",
  title: "Subject",
  fields: [
    {
      name: "univeristy",
      type: "object",
      fields: [
        {
          title: "Select University",
          name: "selecteduniveristy",
          type: "reference",
          to: [{ type: "university" }],
        },
      ],
    },
    {
      name: "batch",
      type: "object",
      fields: [
        {
          title: "Select Batch",
          name: "selectedbatch",
          type: "reference",
          to: [{ type: "batch" }],
        },
      ],
    },
    {
      name: "field",
      type: "object",
      fields: [
        {
          title: "Select Area",
          name: "selectedarea",
          type: "reference",
          to: [{ type: "area_of_field" }],
        },
      ],
    },

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
      name: "subject",
      type: "object",
      fields: [
        {
          title: "Select Subject",
          name: "selectedsubject",
          type: "reference",
          to: [{ type: "allsubjects" }],
        },
      ],
    },
    {
      name: "subject_code",
      type: "string",
      title: "Subject Code",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "subject_code",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      title: "Syllabus",
      name: "syllabus",
      type: "string",
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
              title: "Select Year",
              name: "selectedyear",
              type: "reference",
              to: [{ type: "batch" }],
            },
            {
              title: "PDF file",
              name: "pdf_file",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      title: "Drive Folder",
      type: "array",
      name: "driveFolder",
      of: [
        {
          type: "object",
          name: "inline",
          fields: [
            {
              title: "Link",
              name: "link",
              type: "string",
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
              title: "Link",
              name: "link",
              type: "string",
            },
            {
              title: "Type",
              name: "type",
              type: "string",
              options: {
                list: [
                  { title: "QBank", value: "qbank" },
                  { title: "Assist", value: "assist" },
                ], // <-- predefined values
                layout: "radio",
              },
            },
            {
              title: "Notes Type",
              name: "notestype",
              type: "string",
              options: {
                list: [
                  { title: "Class Notes", value: "classnotes" },
                  { title: "Printed Notes", value: "printednotes" },
                ], // <-- predefined values
                layout: "radio",
              },
            },
            {
              title: "Select Module",
              name: "selectedmodule",
              type: "reference",
              to: [{ type: "module" }],
            },
          ],
        },
      ],
    },

    {
      title: "Youtube Lecture",
      type: "array",
      name: "youtube_lecture",
      of: [
        {
          type: "object",
          name: "inline",
          fields: [
            {
              title: "Youtube Video Code",
              name: "link",
              type: "string",
            },
            {
              title: "Title",
              name: "title",
              type: "string",
            },

            {
              title: "Select Module",
              name: "selectedmodule",
              type: "reference",
              to: [{ type: "module" }],
            },
          ],
        },
      ],
    },
    
  ],
};
