export default {
  $schema: "https://json-schema.org/draft/2019-09/schema",
  $id: "http://example.com/example.json",
  type: "object",
  default: {},
  title: "Root Schema",
  required: ["comments", "auth"],
  properties: {
    comments: {
      type: "array",
      default: [],
      title: "The comments Schema",
      items: {
        type: "string",
        title: "A Schema",
        examples: ["comment1", "comment2"],
      },
      examples: [["comment1", "comment2"]],
    },
    auth: {
      type: "boolean",
      default: false,
      title: "The auth Schema",
      examples: [true],
    },
  },
  examples: [
    {
      comments: ["comment1", "comment2"],
      auth: true,
    },
  ],
};
