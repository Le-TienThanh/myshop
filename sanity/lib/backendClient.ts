import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "../env";


export const backendClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token: process.env.SANITY_API_TOKEN,
})