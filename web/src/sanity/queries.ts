import { defineQuery } from "next-sanity";

export const HOME_QUERY = defineQuery(/* groq */ `
  {
    "settings": *[_type == "siteSettings"][0]{
      title,
      description,
      currentFocus,
      featuredTopics[]->{_id, title, "slug": slug.current, summary}
    },
    "latestNotes": *[_type == "note" && visibility == "public"] | order(updatedAt desc, publishedAt desc)[0...8]{
      _id,
      title,
      "slug": slug.current,
      status,
      summary,
      updatedAt,
      topics[]->{_id, title, "slug": slug.current}
    },
    "featuredEssays": *[_type == "essay" && visibility == "public" && featured == true] | order(publishedAt desc)[0...4]{
      _id,
      title,
      "slug": slug.current,
      summary,
      publishedAt,
      topics[]->{_id, title, "slug": slug.current}
    },
    "topics": *[_type == "topic" && visibility == "public"] | order(priority asc, title asc)[0...12]{
      _id,
      title,
      "slug": slug.current,
      summary
    }
  }
`);

export const NOTE_QUERY = defineQuery(/* groq */ `
  *[_type == "note" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    status,
    visibility,
    summary,
    publishedAt,
    updatedAt,
    body[]{
      _key,
      _type,
      ...,
      markDefs[]{
        _key,
        _type,
        ...,
        _type == "internalLink" => {
          reference->{_type, title, "slug": slug.current}
        }
      }
    },
    topics[]->{_id, title, "slug": slug.current},
    sources[]->{_id, title, kind, url},
    relatedNotes[]->{_id, title, "slug": slug.current, status, summary},
    "backlinks": *[_type in ["note", "essay", "topic"] && references(^._id)]{
      _id,
      _type,
      title,
      "slug": slug.current
    }
  }
`);

export const NOTES_INDEX_QUERY = defineQuery(/* groq */ `
  *[_type == "note" && visibility == "public"] | order(updatedAt desc, publishedAt desc)[0...60]{
    _id,
    title,
    "slug": slug.current,
    status,
    summary,
    updatedAt,
    publishedAt,
    topics[]->{_id, title, "slug": slug.current}
  }
`);

export const TOPIC_QUERY = defineQuery(/* groq */ `
  *[_type == "topic" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    visibility,
    summary,
    body[]{
      _key,
      _type,
      ...,
      markDefs[]{
        _key,
        _type,
        ...,
        _type == "internalLink" => {
          reference->{_type, title, "slug": slug.current}
        }
      }
    },
    "notes": *[_type == "note" && references(^._id) && visibility == "public"] | order(updatedAt desc)[0...20]{
      _id,
      title,
      "slug": slug.current,
      status,
      summary
    },
    "essays": *[_type == "essay" && references(^._id) && visibility == "public"] | order(publishedAt desc)[0...12]{
      _id,
      title,
      "slug": slug.current,
      summary
    }
  }
`);

export const TOPICS_INDEX_QUERY = defineQuery(/* groq */ `
  *[_type == "topic" && visibility == "public"] | order(priority asc, title asc){
    _id,
    title,
    "slug": slug.current,
    summary,
    "noteCount": count(*[_type == "note" && visibility == "public" && references(^._id)]),
    "essayCount": count(*[_type == "essay" && visibility == "public" && references(^._id)])
  }
`);

export const ESSAYS_INDEX_QUERY = defineQuery(/* groq */ `
  *[_type == "essay" && visibility == "public"] | order(publishedAt desc)[0...60]{
    _id,
    title,
    "slug": slug.current,
    summary,
    featured,
    publishedAt,
    topics[]->{_id, title, "slug": slug.current}
  }
`);

export const ESSAY_QUERY = defineQuery(/* groq */ `
  *[_type == "essay" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    visibility,
    summary,
    publishedAt,
    body[]{
      _key,
      _type,
      ...,
      markDefs[]{
        _key,
        _type,
        ...,
        _type == "internalLink" => {
          reference->{_type, title, "slug": slug.current}
        }
      }
    },
    topics[]->{_id, title, "slug": slug.current},
    sources[]->{_id, title, kind, url},
    "backlinks": *[_type in ["note", "essay", "topic"] && references(^._id)]{
      _id,
      _type,
      title,
      "slug": slug.current
    }
  }
`);

export const NOW_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0]{
    title,
    description,
    currentFocus,
    featuredTopics[]->{_id, title, "slug": slug.current, summary}
  }
`);
