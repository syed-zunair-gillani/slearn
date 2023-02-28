export default {
  name: "module",
  type: "document",
  title: "Module",
  fields: [
    
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
  ],
};
