import imageUrlBuilder from "@sanity/image-url"
import type {ImageUrlBuilder} from "@sanity/image-url/lib/types/builder"
import type {SanityImageSource} from "@sanity/image-url/lib/types/types"

import {dataset, projectId} from "./env"

const builder: ImageUrlBuilder = imageUrlBuilder({projectId, dataset})

export const urlFor = (source: SanityImageSource) => builder.image(source)
