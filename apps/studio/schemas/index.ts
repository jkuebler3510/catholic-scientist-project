// Objects
import seo from "./objects/seo";
import slug from "./objects/slug";
import navItem from "./objects/navItem";
import footerColumn from "./objects/footerColumn";
import socialLink from "./objects/socialLink";
import location from "./objects/location";
import richText from "./objects/richText";

// Documents
import siteSettings from "./documents/siteSettings";
import homepage from "./documents/homepage";
import page from "./documents/page";
import category from "./documents/category";
import eventCategory from "./documents/eventCategory";
import person from "./documents/person";
import post from "./documents/post";
import event from "./documents/event";
import talk from "./documents/talk";
import conference from "./documents/conference";
import scientist from "./documents/scientist";
import chapter from "./documents/chapter";
import faqEntry from "./documents/faqEntry";
import idea from "./documents/idea";

// Blocks
import heroBlock from "./blocks/heroBlock";
import missionStatementBlock from "./blocks/missionStatementBlock";
import featuredNewsBlock from "./blocks/featuredNewsBlock";
import upcomingEventsBlock from "./blocks/upcomingEventsBlock";
import featuredScientistBlock from "./blocks/featuredScientistBlock";
import videoSpotlightBlock from "./blocks/videoSpotlightBlock";
import calloutBlock from "./blocks/calloutBlock";
import testimonialBlock from "./blocks/testimonialBlock";
import richTextBlock from "./blocks/richTextBlock";
import statsBlock from "./blocks/statsBlock";
import chaptersMapBlock from "./blocks/chaptersMapBlock";
import logoCloudBlock from "./blocks/logoCloudBlock";
import timelineBlock from "./blocks/timelineBlock";
import faqBlock from "./blocks/faqBlock";

export const schemaTypes = [
  // Objects
  seo,
  slug,
  navItem,
  footerColumn,
  socialLink,
  location,
  richText,

  // Singletons
  siteSettings,
  homepage,

  // Content documents
  page,
  category,
  eventCategory,
  person,
  post,
  event,
  talk,
  conference,
  scientist,
  chapter,
  faqEntry,
  idea,

  // Blocks
  heroBlock,
  missionStatementBlock,
  featuredNewsBlock,
  upcomingEventsBlock,
  featuredScientistBlock,
  videoSpotlightBlock,
  calloutBlock,
  testimonialBlock,
  richTextBlock,
  statsBlock,
  chaptersMapBlock,
  logoCloudBlock,
  timelineBlock,
  faqBlock,
];
