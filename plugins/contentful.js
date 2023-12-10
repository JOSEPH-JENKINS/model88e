import { createClient } from "contentful";
import contentful from "contentful";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const createClientFunc =
    process.env.NODE_ENV === "development"
      ? createClient
      : contentful.createClient;

  const client = createClientFunc({
    space: process.env.CONTENTFUL_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  return {
    provide: {
      contentfulClient: client,
    },
  };
});
