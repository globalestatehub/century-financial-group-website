import Script from "next/script";

const AGENT_ID = "agent_8701kcc03rm3ebsac89px542rnwb";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "agent-id": string;
      };
    }
  }
}

/** ElevenLabs conversational assistant, available on every public page. */
export function ElevenLabsAssistant() {
  return (
    <>
      <elevenlabs-convai agent-id={AGENT_ID} />
      <Script
        id="elevenlabs-convai-widget-embed"
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />
    </>
  );
}
