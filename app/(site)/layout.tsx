import { ElevenLabsAssistant } from "@/components/eleven-labs-assistant";
import { SiteHeader } from "@/components/site-header";

/** Public pages share the masthead and the ElevenLabs assistant. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      {children}
      <ElevenLabsAssistant />
    </>
  );
}
