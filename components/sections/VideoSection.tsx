import { Section } from '@/components/ui/Section';
import { Kicker } from '@/components/ui/Kicker';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { VideoVertical } from '@/components/VideoVertical';
import type { VideoContent } from '@/content/fortaleza-legado';

interface VideoSectionProps {
  readonly content: VideoContent;
}

export function VideoSection({ content }: VideoSectionProps) {
  return (
    <Section bg="darker" id="video">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <Kicker>{content.kicker}</Kicker>
          <SectionTitle className="mt-4">{content.titulo}</SectionTitle>
          <p className="mt-6 text-white/80">{content.parrafo}</p>
          <Button href={content.ctaHref} ariaLabel={content.ctaLabel} className="mt-8">
            {content.ctaLabel}
          </Button>
        </div>

        <div>
          <VideoVertical
            src={content.video.src}
            poster={content.video.poster}
            title={content.video.title}
          />
        </div>
      </div>
    </Section>
  );
}
