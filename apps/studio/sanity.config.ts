import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "placeholder";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "development";

export default defineConfig({
  name: "Society of Catholic Scientists",
  title: "Society of Catholic Scientists",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
