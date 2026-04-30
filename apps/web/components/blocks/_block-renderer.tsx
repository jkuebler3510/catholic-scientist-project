import { HeroBlock } from "./hero-block";
import { MissionStatementBlock } from "./mission-statement-block";
import { CalloutBlock } from "./callout-block";
import { StatsBlock } from "./stats-block";

/**
 * Block renderer for mapping CMS block types to React components.
 *
 * This is the central dispatcher that turns Sanity block documents into rendered components.
 * Uses an exhaustive switch to ensure every block type defined in the CMS has a corresponding
 * render implementation.
 *
 * Usage in pages:
 *   blocks.map(block => renderBlock(block))
 */

// Block shape is loose until 02-cms-schema lands the typed CMS exports.
type Block = {
  _type: string;
  _key?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export function renderBlock(block: Block) {
  if (!block) return null;

  switch (block._type) {
    case "heroBlock":
      return (
        <HeroBlock
          key={block._key}
          eyebrow={block.eyebrow}
          headline={block.headline}
          subhead={block.subhead}
          image={block.image}
          actions={block.actions}
          tone={block.tone}
          variant={block.variant}
        />
      );

    case "missionStatementBlock":
      return (
        <MissionStatementBlock
          key={block._key}
          kicker={block.kicker}
          statement={block.statement}
          signature={block.signature}
        />
      );

    case "calloutBlock":
      return (
        <CalloutBlock
          key={block._key}
          tone={block.tone}
          eyebrow={block.eyebrow}
          heading={block.heading}
          body={block.body}
          action={block.action}
        />
      );

    case "statsBlock":
      return (
        <StatsBlock
          key={block._key}
          heading={block.heading}
          stats={block.stats}
        />
      );

    default:
      console.warn(`Unknown block type: ${block._type}`);
      return null;
  }
}
