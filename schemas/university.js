export default {
  name: "university",
  type: "document",
  title: "University",
  fields: [
    {
      name: "university_name",
      type: "string",
      title: "University Name",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "university_name",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      title: 'Icon',
      name: 'icon',
      type: "string",
    },
  ],
};
