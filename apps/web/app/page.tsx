import {
  SkipToContent,
  Heading,
  Text,
  Container,
  Button,
} from "@/components/ui";
import { HeroBlock, CalloutBlock } from "@/components/blocks";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SkipToContent />

      <main id="main">
        <HeroBlock
          headline="Society of Catholic Scientists"
          subhead="Advancing the integration of faith and reason in scientific inquiry"
          tone="gold"
          variant="home"
          actions={[
            {
              label: "Learn More",
              variant: "primary",
            },
            {
              label: "Become a Member",
              variant: "secondary",
            },
          ]}
        />

        <Container width="content" className="py-24 md:py-32">
          <Heading variant="h2" className="text-center mb-8">
            Welcome
          </Heading>
          <Text className="text-center max-w-2xl mx-auto mb-12">
            The Society of Catholic Scientists brings together practicing
            scientists who are committed to exploring the compatibility of faith
            and reason. We foster intellectual exchange, publish research, and
            maintain the tradition of Catholic engagement with science.
          </Text>

          <div className="text-center">
            <Link href="/dev/design">
              <Button variant="primary" size="lg">
                View the Design System
              </Button>
            </Link>
          </div>
        </Container>

        <CalloutBlock
          tone="gold"
          heading="Ready to Explore?"
          body="Visit our design system showcase to see all available components."
          action={
            <Link href="/dev/design">
              <Button variant="primary">Design System</Button>
            </Link>
          }
        />
      </main>
    </>
  );
}
