import { createClient } from "next-sanity";

const config = {
    projectId: "jekx68a6",
    dataset: "production",
    apiVersion: "2021-10-14",
    useCdn: false
}

export const sanityClient = createClient(config);


