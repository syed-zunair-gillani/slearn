export default {
  name: "area_of_field",
  type: "document",
  title: "Area of field",
  fields: [
    
    {
      name: "field",
      type: "string",
      title: "Field",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "field",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      title: "Icon/Image",
      name: "icon",
      type: "string",
    },
  ],
};
