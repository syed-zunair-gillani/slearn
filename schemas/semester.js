export default {
     name: "semester",
     type: "document",
     title: "Semester",
     fields: [
       
       {
         name: "semester",
         type: "string",
         title: "Semester",
       },
       {
         title: "Slug",
         name: "slug",
         type: "slug",
         options: {
           source: "semester",
           maxLength: 200, // will be ignored if slugify is set
           slugify: (input) =>
             input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
         },
       },
       
     ],
   };
   