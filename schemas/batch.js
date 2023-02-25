export default {
  name: "batch",
  type: "document",
  title: "Batch",
  fields: [
    
    {
      name: "year",
      type: "string",
      title: "Year",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "year",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
  ],
};
