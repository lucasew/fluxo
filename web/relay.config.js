export default {
  src: "./src",
  schema: "../internal/graphql/schema.graphqls",
  language: "typescript",
  artifactDirectory: "./src/__generated__",
  exclude: ["**/node_modules/**", "**/__generated__/**"],
};
