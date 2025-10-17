import type {ReactNode} from "react"
import Image from "next/image"
import Link from "next/link"
import {
  PortableText,
  type PortableTextComponentProps,
  type PortableTextMarkComponentProps,
  type PortableTextReactComponents,
  type PortableTextTypeComponentProps,
} from "@portabletext/react"
import type {PortableTextBlock} from "@portabletext/types"

import {urlFor} from "@/lib/sanity.image"
import type {SanityImage} from "@/types/sanity"

type LinkValue = {
  _type: "link"
  href?: string
  openInNewTab?: boolean
}

type ImageValue = SanityImage & {_type: "image"}

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({value}: PortableTextTypeComponentProps<ImageValue>) => {
      if (!value?.asset) {
        return null
      }

      const imageUrl = urlFor(value).width(1200).fit("max").quality(90).url()

      return (
        <figure className="my-8 overflow-hidden rounded-2xl bg-slate-50">
          <Image
            src={imageUrl}
            alt={value.alt || ""}
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
          />
          {value.caption ? <figcaption className="px-6 py-4 text-center text-sm text-slate-500">{value.caption}</figcaption> : null}
        </figure>
      )
    },
  },
  marks: {
    link: ({children, value}: PortableTextMarkComponentProps<LinkValue>) => {
      const href = value?.href || "#"
      const target = value?.openInNewTab ? "_blank" : undefined
      const rel = value?.openInNewTab ? "noreferrer" : undefined

      return (
        <Link href={href} target={target} rel={rel} className="text-blue-700 underline decoration-sky-400 underline-offset-4">
          {children}
        </Link>
      )
    },
  },
  block: {
    normal: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="leading-8 text-slate-700 dark:text-slate-200">{children}</p>
    ),
    h2: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="mt-12 text-3xl font-semibold text-slate-900 dark:text-slate-100">{children}</h2>
    ),
    h3: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="mt-8 text-2xl font-semibold text-slate-900 dark:text-slate-100">{children}</h3>
    ),
    blockquote: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <blockquote className="border-r-4 border-blue-700/50 bg-sky-50 px-6 py-4 text-lg italic text-sky-900 dark:border-sky-600 dark:bg-sky-950/40 dark:text-blue-200">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="flex list-disc flex-col gap-2 pr-6 text-slate-700 dark:text-slate-200">{children as ReactNode}</ul>
    ),
    number: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="list-decimal pr-6 text-slate-700 dark:text-slate-200">{children as ReactNode}</ol>
    ),
  },
}

interface PortableTextProps {
  value: PortableTextBlock[]
}

export function PortableTextContent({value}: PortableTextProps) {
  return <PortableText value={value} components={components} />
}

