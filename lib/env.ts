const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "53gqdkzj"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable")
}

if (!dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET environment variable")
}

export {projectId, dataset}
export const apiVersion = process.env.SANITY_API_VERSION || "2025-10-05"
export const token = process.env.SANITY_READ_TOKEN
export const previewSecret = process.env.SANITY_PREVIEW_SECRET || "blog-preview-secret"
