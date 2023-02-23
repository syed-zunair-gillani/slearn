export default {
  name: "area_of_field",
  type: "document",
  title: "Area of field",
  fields: [
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
      type: "image",
      options: {
        hotspot: true, // <-- Defaults to false
      },
    },
  ],
};
