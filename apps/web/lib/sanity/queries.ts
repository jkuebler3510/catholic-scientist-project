import { groq } from "next-sanity";

// Homepage query
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    seo,
    "blocks": blocks[] {
      _type,
      _id,
      _type == "heroBlock" => {
        ...,
      },
      _type == "missionStatementBlock" => {
        ...,
      },
      _type == "featuredNewsBlock" => {
        ...,
        "posts": mode == "latest" => {
          *[_type == "post" && !(_id in path('drafts.**'))] | order(publishedAt desc)[0...$count - 1] {
            _id,
            title,
            slug,
            excerpt,
            coverImage,
            publishedAt,
          }
        },
        mode == "curated" => {
          "posts": selectedPosts[] -> {
            _id,
            title,
            slug,
            excerpt,
            coverImage,
            publishedAt,
          }
        },
      },
      _type == "upcomingEventsBlock" => {
        ...,
        "events": *[_type == "event" && startDate > now() && (categoryFilter == null || category._ref == categoryFilter._ref)] | order(startDate asc)[0...^.count] {
          _id,
          title,
          slug,
          startDate,
          timezone,
          location,
          "category": category -> {
            title,
            slug,
            color,
          },
        }
      },
      _type == "featuredScientistBlock" => {
        ...,
        "scientist": mode == "curated" => {
          selectedScientist -> {
            _id,
            name,
            slug,
            summary,
            portrait,
            birthYear,
            deathYear,
            field,
          }
        },
        mode == "weekly-rotation" => {
          *[_type == "scientist" && featuredOnHomepage == true] | order(birthYear asc)[0] {
            _id,
            name,
            slug,
            summary,
            portrait,
            birthYear,
            deathYear,
            field,
          }
        },
      },
      _type == "videoSpotlightBlock" => {
        ...,
        "talk": talkRef -> {
          _id,
          title,
          slug,
          youtubeId,
          description,
          "speaker": speaker -> {
            name,
          },
        }
      },
      _type == "calloutBlock" => {
        ...,
      },
      _type == "testimonialBlock" => {
        ...,
      },
      _type == "richTextBlock" => {
        ...,
      },
      _type == "statsBlock" => {
        ...,
      },
      _type == "chaptersMapBlock" => {
        ...,
      },
      _type == "logoCloudBlock" => {
        ...,
      },
      _type == "timelineBlock" => {
        ...,
      },
      _type == "faqBlock" => {
        ...,
      },
    }
  }
`;

// Posts list query (paginated)
export const postsListQuery = groq`
  {
    "posts": *[_type == "post" && !(_id in path('drafts.**'))] | order(publishedAt desc)[$from...$to] {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      publishedAt,
      "author": author -> {
        name,
        slug,
        headshot,
      }
    },
    "total": count(*[_type == "post" && !(_id in path('drafts.**'))])
  }
`;

// Post by slug query
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
    ...,
    "author": author -> {
      name,
      slug,
      headshot,
      bio,
    },
    "categories": categories[] -> {
      title,
      slug,
    },
    "relatedPosts": relatedPosts[] -> {
      _id,
      title,
      slug,
      coverImage,
      publishedAt,
    }
  }
`;

// Upcoming events query
export const upcomingEventsQuery = groq`
  *[_type == "event" && startDate > now() && !(_id in path('drafts.**'))] | order(startDate asc) {
    _id,
    title,
    slug,
    startDate,
    endDate,
    timezone,
    location,
    online,
    "category": category -> {
      title,
      slug,
      color,
    }
  }
`;

// Event by slug query
export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
    ...,
    "category": category -> {
      title,
      slug,
      color,
    },
    "speakers": speakers[] -> {
      name,
      slug,
      headshot,
      title,
    },
    "relatedConference": relatedConference -> {
      title,
      slug,
      year,
    }
  }
`;

// Conference by year query
export const conferenceByYearQuery = groq`
  *[_type == "conference" && year == $year && !(_id in path('drafts.**'))][0] {
    ...,
    "talks": talks[] -> {
      _id,
      title,
      slug,
      youtubeId,
      posterImage,
      "speaker": speaker -> {
        name,
      },
    }
  }
`;

// Conferences list query
export const conferencesListQuery = groq`
  *[_type == "conference" && !(_id in path('drafts.**'))] | order(year desc) {
    _id,
    title,
    year,
    slug,
    summary,
    theme,
    posterImage,
    "location": location.city + ", " + location.country,
  }
`;

// Talk by slug query
export const talkBySlugQuery = groq`
  *[_type == "talk" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
    ...,
    "speaker": speaker -> {
      name,
      slug,
      title,
      affiliation,
    },
    "coSpeakers": coSpeakers[] -> {
      name,
      slug,
    },
    "topics": topics[] -> {
      title,
      slug,
    }
  }
`;

// Talks/lectures list query
export const talksListQuery = groq`
  *[_type == "talk" && !(_id in path('drafts.**'))] | order(date desc) {
    _id,
    title,
    slug,
    youtubeId,
    posterImage,
    date,
    "speaker": speaker -> {
      name,
      slug,
    },
    durationMinutes,
  }
`;

// Scientists list query
export const scientistsListQuery = groq`
  *[_type == "scientist" && !(_id in path('drafts.**'))] | order(birthYear asc) {
    _id,
    name,
    slug,
    summary,
    portrait,
    birthYear,
    deathYear,
    field,
    nationality,
  }
`;

// Scientist by slug query
export const scientistBySlugQuery = groq`
  *[_type == "scientist" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
    ...,
  }
`;

// Chapters list query
export const chaptersListQuery = groq`
  *[_type == "chapter" && !(_id in path('drafts.**'))] | order(country asc, name asc) {
    _id,
    name,
    slug,
    region,
    country,
    city,
    coordinates,
    "coordinator": coordinator -> {
      name,
    }
  }
`;

// Chapter by slug query
export const chapterBySlugQuery = groq`
  *[_type == "chapter" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
    ...,
    "coordinator": coordinator -> {
      name,
      slug,
      title,
      affiliation,
      headshot,
    },
    "recentEvents": *[_type == "event" && host.chapter._ref == ^._id && startDate > now()] | order(startDate asc)[0...5] {
      title,
      slug,
      startDate,
    }
  }
`;

// FAQ by category query
export const faqByCategoryQuery = groq`
  *[_type == "faqEntry" && category == $category && !(_id in path('drafts.**'))] | order(order asc) {
    question,
    answer,
  }
`;

// All FAQ entries query
export const allFaqQuery = groq`
  *[_type == "faqEntry" && !(_id in path('drafts.**'))] | order(order asc) {
    question,
    answer,
    category,
  }
`;

// Ideas/essays list query
export const ideasListQuery = groq`
  *[_type == "idea" && !(_id in path('drafts.**'))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    "author": author -> {
      name,
      slug,
    }
  }
`;

// Idea by slug query
export const ideaBySlugQuery = groq`
  *[_type == "idea" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
    ...,
    "author": author -> {
      name,
      slug,
      title,
      affiliation,
      headshot,
    },
    "topics": topics[] -> {
      title,
      slug,
    }
  }
`;

// Site settings query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    logo,
    socialImage,
    primaryNav,
    footerColumns,
    socialLinks,
    contactEmail,
    mailingAddress,
    donateUrl,
  }
`;

// Generic page by slug query
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
    ...,
    "blocks": blocks[] {
      _type,
      _id,
      _type == "heroBlock" => {
        ...,
      },
      _type == "missionStatementBlock" => {
        ...,
      },
      _type == "featuredNewsBlock" => {
        ...,
        "posts": mode == "latest" => {
          *[_type == "post" && !(_id in path('drafts.**'))] | order(publishedAt desc)[0...$count - 1] {
            _id,
            title,
            slug,
            excerpt,
            coverImage,
            publishedAt,
          }
        },
        mode == "curated" => {
          "posts": selectedPosts[] -> {
            _id,
            title,
            slug,
            excerpt,
            coverImage,
            publishedAt,
          }
        },
      },
      _type == "upcomingEventsBlock" => {
        ...,
        "events": *[_type == "event" && startDate > now() && (categoryFilter == null || category._ref == categoryFilter._ref)] | order(startDate asc)[0...^.count] {
          _id,
          title,
          slug,
          startDate,
          timezone,
          location,
          "category": category -> {
            title,
            slug,
            color,
          },
        }
      },
      _type == "featuredScientistBlock" => {
        ...,
        "scientist": mode == "curated" => {
          selectedScientist -> {
            _id,
            name,
            slug,
            summary,
            portrait,
            birthYear,
            deathYear,
            field,
          }
        },
        mode == "weekly-rotation" => {
          *[_type == "scientist" && featuredOnHomepage == true] | order(birthYear asc)[0] {
            _id,
            name,
            slug,
            summary,
            portrait,
            birthYear,
            deathYear,
            field,
          }
        },
      },
      _type == "videoSpotlightBlock" => {
        ...,
        "talk": talkRef -> {
          _id,
          title,
          slug,
          youtubeId,
          description,
          "speaker": speaker -> {
            name,
          },
        }
      },
      _type == "calloutBlock" => {
        ...,
      },
      _type == "testimonialBlock" => {
        ...,
      },
      _type == "richTextBlock" => {
        ...,
      },
      _type == "statsBlock" => {
        ...,
      },
      _type == "chaptersMapBlock" => {
        ...,
      },
      _type == "logoCloudBlock" => {
        ...,
      },
      _type == "timelineBlock" => {
        ...,
      },
      _type == "faqBlock" => {
        ...,
      },
    }
  }
`;

// Query tags for revalidation
export const queryTags = {
  homepage: ["homepage", "post:list", "event:upcoming", "scientist:list"],
  post: (slug: string) => [`post:slug:${slug}`, "post:list"],
  event: (slug: string) => [
    `event:slug:${slug}`,
    "event:list",
    "event:upcoming",
  ],
  conference: (year: number) => [`conference:year:${year}`, "conference:list"],
  talk: (slug: string) => [`talk:slug:${slug}`, "talk:list"],
  scientist: (slug: string) => [`scientist:slug:${slug}`, "scientist:list"],
  chapter: (slug: string) => [`chapter:slug:${slug}`, "chapter:list"],
  idea: (slug: string) => [`idea:slug:${slug}`, "idea:list"],
  page: (slug: string) => [`page:slug:${slug}`],
  siteSettings: ["siteSettings"],
  faqEntry: ["faqEntry:list"],
} as const;
