export default {
     name: "allsubjects",
     type: "document",
     title: "All Subjects",
     fields: [
       
       {
         name: "subject",
         type: "string",
         title: "Subject",
       },
       {
         title: "Slug",
         name: "slug",
         type: "slug",
         options: {
           source: "subject",
           maxLength: 200, // will be ignored if slugify is set
           slugify: (input) =>
             input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
         },
       },
       
     ],
   };
   




