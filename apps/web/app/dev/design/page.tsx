import {
  Heading,
  Text,
  Container,
  Stack,
  Inline,
  Divider,
  Button,
  Card,
  Badge,
  Callout,
  Alert,
  Quote,
  Definition,
  Avatar,
  SkipToContent,
  Prose,
} from "@/components/ui";
import {
  HeroBlock,
  MissionStatementBlock,
  CalloutBlock,
  StatsBlock,
} from "@/components/blocks";

export const metadata = {
  title: "Design System",
  description:
    "UI primitives and design tokens for the Society of Catholic Scientists.",
  robots: "noindex, nofollow",
};

export default function DesignPage() {
  return (
    <>
      <SkipToContent href="#main" />

      <main id="main" className="min-h-screen bg-bg-canvas">
        <Container width="full" className="py-12">
          <div className="space-y-24">
            {/* Hero Block */}
            <section>
              <Heading variant="h2" className="mb-6">
                Hero Block
              </Heading>
              <HeroBlock
                eyebrow="Welcome"
                headline="Design System Showcase"
                subhead="All primitives and blocks in action"
                tone="gold"
                variant="inner"
              />
            </section>

            {/* Typography */}
            <section className="space-y-8">
              <Heading variant="h2">Typography</Heading>

              <Stack gap="8">
                <div>
                  <Heading variant="display">Display (5xl)</Heading>
                  <Text tone="subtle" className="text-sm mt-2">
                    Largest headline for hero sections
                  </Text>
                </div>

                <div>
                  <Heading variant="h1">Heading 1 (4xl)</Heading>
                  <Text tone="subtle" className="text-sm mt-2">
                    Page title
                  </Text>
                </div>

                <div>
                  <Heading variant="h2">Heading 2 (3xl)</Heading>
                  <Text tone="subtle" className="text-sm mt-2">
                    Section heading
                  </Text>
                </div>

                <div>
                  <Heading variant="h3">Heading 3 (2xl)</Heading>
                  <Text tone="subtle" className="text-sm mt-2">
                    Subsection
                  </Text>
                </div>

                <div>
                  <Heading variant="h4">Heading 4 (xl)</Heading>
                  <Text tone="subtle" className="text-sm mt-2">
                    Minor heading
                  </Text>
                </div>

                <div>
                  <Heading variant="eyebrow">Eyebrow / Label</Heading>
                  <Text tone="subtle" className="text-sm mt-2">
                    Small caps for labels
                  </Text>
                </div>

                <div>
                  <Text variant="body">
                    Body text in 16px with 1.65 line height. The quick brown fox
                    jumps over the lazy dog. Perfect for long-form reading with
                    comfortable character count.
                  </Text>
                </div>

                <div>
                  <Text variant="lead">
                    Lead paragraph in 18px. Used for article deks and
                    introductions.
                  </Text>
                </div>

                <div>
                  <Text variant="caption">
                    Caption text in 14px semibold. Used for image captions and
                    labels.
                  </Text>
                </div>
              </Stack>
            </section>

            {/* Colors */}
            <section className="space-y-8">
              <Heading variant="h2">Colors</Heading>

              <div className="space-y-6">
                <div>
                  <Heading variant="h3">Brand Palette</Heading>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
                    {["gold", "ink", "parchment", "claret"].map((color) => (
                      <div key={color} className="space-y-2">
                        <div
                          className={`h-24 rounded-lg border bg-${color}-500`}
                        />
                        <Text className="text-sm font-semibold">{color}</Text>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Heading variant="h3">Semantic Tokens</Heading>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                    <Card variant="border">
                      <Text className="font-semibold">Canvas</Text>
                      <Text tone="subtle">bg-canvas (page background)</Text>
                    </Card>
                    <Card variant="border">
                      <Text className="font-semibold">Surface</Text>
                      <Text tone="subtle">bg-surface (card background)</Text>
                    </Card>
                    <Card variant="border">
                      <Text className="font-semibold">Inverse</Text>
                      <Text tone="subtle">bg-inverse (dark backgrounds)</Text>
                    </Card>
                    <Card variant="border">
                      <Text className="font-semibold">Link</Text>
                      <Text tone="subtle">fg-link (gold-700)</Text>
                    </Card>
                  </div>
                </div>
              </div>
            </section>

            {/* Buttons */}
            <section className="space-y-8">
              <Heading variant="h2">Buttons</Heading>

              <div className="space-y-6">
                <div>
                  <Heading variant="h3">Variants</Heading>
                  <Inline gap="4" className="flex-wrap mt-4">
                    <Button variant="primary" type="button">
                      Primary
                    </Button>
                    <Button variant="secondary" type="button">
                      Secondary
                    </Button>
                    <Button variant="ghost" type="button">
                      Ghost
                    </Button>
                    <Button variant="link" type="button">
                      Link
                    </Button>
                    <Button variant="sacred" type="button">
                      Sacred
                    </Button>
                  </Inline>
                </div>

                <div>
                  <Heading variant="h3">Sizes</Heading>
                  <Inline gap="4" className="flex-wrap mt-4">
                    <Button size="sm" type="button">
                      Small
                    </Button>
                    <Button size="md" type="button">
                      Medium
                    </Button>
                    <Button size="lg" type="button">
                      Large
                    </Button>
                  </Inline>
                </div>

                <div>
                  <Heading variant="h3">States</Heading>
                  <Inline gap="4" className="flex-wrap mt-4">
                    <Button type="button" disabled>
                      Disabled
                    </Button>
                    <Button type="button" isLoading>
                      Loading
                    </Button>
                  </Inline>
                </div>
              </div>
            </section>

            {/* Cards */}
            <section className="space-y-8">
              <Heading variant="h2">Cards</Heading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Card variant="border">
                  <Heading variant="h3">Bordered Card</Heading>
                  <Text className="mt-2">
                    A card with a subtle border and no shadow.
                  </Text>
                </Card>

                <Card variant="shadow">
                  <Heading variant="h3">Shadow Card</Heading>
                  <Text className="mt-2">
                    A card with a soft shadow and no border.
                  </Text>
                </Card>

                <Card as="article" variant="border">
                  <Heading variant="h3">Article Card</Heading>
                  <Text className="mt-2">
                    Cards can be semantic article elements.
                  </Text>
                </Card>
              </div>
            </section>

            {/* Badges */}
            <section className="space-y-8">
              <Heading variant="h2">Badges</Heading>

              <Inline gap="4" className="flex-wrap">
                <Badge variant="default">Default</Badge>
                <Badge variant="gold">Gold</Badge>
                <Badge variant="claret">Claret</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </Inline>
            </section>

            {/* Callouts */}
            <section className="space-y-8">
              <Heading variant="h2">Callouts</Heading>

              <Stack gap="6">
                <Callout
                  tone="gold"
                  eyebrow="Action"
                  heading="Become a Member"
                  body="Join a community of Catholic scientists advancing the Church's engagement with science."
                  action={
                    <Button variant="primary" type="button">
                      Learn More
                    </Button>
                  }
                />

                <Callout
                  tone="claret"
                  heading="Support Our Mission"
                  body="Your donation directly supports scholarship and research."
                  action={
                    <Button variant="primary" type="button">
                      Donate
                    </Button>
                  }
                />

                <Callout
                  tone="ink"
                  heading="Neutral Callout"
                  body="This callout uses the ink tone."
                />
              </Stack>
            </section>

            {/* Alerts */}
            <section className="space-y-8">
              <Heading variant="h2">Alerts</Heading>

              <Stack gap="4">
                <Alert variant="info" title="Information">
                  This is an informational alert.
                </Alert>

                <Alert variant="success" title="Success">
                  Your action completed successfully.
                </Alert>

                <Alert variant="warning" title="Warning">
                  Please review this information carefully.
                </Alert>

                <Alert variant="error" title="Error">
                  An error occurred. Please try again.
                </Alert>
              </Stack>
            </section>

            {/* Quotes */}
            <section className="space-y-8">
              <Heading variant="h2">Quotes</Heading>

              <Quote citation="Saint Albert the Great">
                The study of nature is the path to understanding God's creation
                and our place within it.
              </Quote>
            </section>

            {/* Definitions */}
            <section className="space-y-8">
              <Heading variant="h2">Definitions / Glossary</Heading>

              <Definition
                items={[
                  {
                    term: "What is a Gold Mass?",
                    definition:
                      "A Gold Mass is a special liturgical celebration honoring Saint Albert the Great, the patron saint of scientists. It brings together the scientific and spiritual dimensions of the Catholic faith.",
                  },
                  {
                    term: "Who can join?",
                    definition:
                      "The Society welcomes practicing scientists of all fields who are committed to the Catholic faith and interested in exploring the relationship between science and religion.",
                  },
                ]}
              />
            </section>

            {/* Avatars */}
            <section className="space-y-8">
              <Heading variant="h2">Avatars</Heading>

              <Inline gap="6">
                <Avatar initials="JD" name="Jane Doe" size="sm" />
                <Avatar initials="JD" name="Jane Doe" size="md" />
                <Avatar initials="JD" name="Jane Doe" size="lg" />
              </Inline>
            </section>

            {/* Dividers */}
            <section className="space-y-8">
              <Heading variant="h2">Dividers</Heading>

              <Stack gap="8">
                <Divider />
                <Divider label="OR" />
                <Divider ornament="✦" />
              </Stack>
            </section>

            {/* Prose */}
            <section className="space-y-8">
              <Heading variant="h2">Prose / Long-form Content</Heading>

              <Prose>
                <h2>Article Example</h2>
                <p>
                  This is a long-form article using the Prose wrapper. It
                  applies typography rules for comfortable reading.
                </p>
                <h3>Subsection</h3>
                <p>
                  The quick brown fox jumps over the lazy dog. Properly spaced
                  paragraphs and headings create visual rhythm.
                </p>
                <ul>
                  <li>Bullet point one</li>
                  <li>Bullet point two</li>
                  <li>Bullet point three</li>
                </ul>
                <blockquote>
                  A block quote styled differently from regular paragraphs.
                </blockquote>
              </Prose>
            </section>

            {/* Blocks */}
            <section className="space-y-8">
              <Heading variant="h2">Page Blocks</Heading>

              <MissionStatementBlock
                kicker="Our Mission"
                statement="Bringing together the scientific and spiritual dimensions of faith to advance human knowledge and the Church's engagement with science."
                signature="— The Society of Catholic Scientists"
              />

              <CalloutBlock
                tone="gold"
                heading="Register for the Next Conference"
                body="Join leading Catholic scientists for three days of presentations, discussions, and spiritual reflection."
                action={
                  <Button variant="primary" type="button">
                    Register Now
                  </Button>
                }
              />

              <StatsBlock
                heading="By the Numbers"
                stats={[
                  { value: "1,800+", label: "Members" },
                  { value: "27", label: "Chapters" },
                  { value: "9", label: "Annual Conferences" },
                ]}
              />
            </section>

            {/* Accessibility Notes */}
            <section className="space-y-8 bg-parchment-100 p-8 rounded-lg">
              <Heading variant="h2">Accessibility</Heading>

              <Stack gap="4">
                <Alert variant="info" title="Keyboard Navigation">
                  All interactive components are fully keyboard accessible.
                  Press Tab to navigate, Enter/Space to activate buttons.
                </Alert>

                <Alert variant="info" title="Color Contrast">
                  All color combinations meet WCAG 2.2 AA standards (4.5:1 for
                  body text, 3:1 for large text and UI).
                </Alert>

                <Alert variant="info" title="Focus Visible">
                  Focus rings are visible on all focusable elements. Ring style:
                  2px gold-500 with 2px offset.
                </Alert>

                <Alert variant="info" title="Screen Reader Support">
                  Components use semantic HTML and ARIA attributes for screen
                  reader compatibility.
                </Alert>

                <Alert variant="info" title="Motion">
                  All animations respect `prefers-reduced-motion`. No
                  auto-playing content.
                </Alert>
              </Stack>
            </section>
          </div>
        </Container>
      </main>
    </>
  );
}
