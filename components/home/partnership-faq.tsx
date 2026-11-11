"use client";

import { ChevronDown } from "lucide-react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { partnershipFaqs } from "@/lib/content/partnership";

/**
 * Partnership FAQ. Built on the shadcn Accordion (Base UI), styled in the
 * Covenant Ledger idiom. One answer open at a time; the first is open by default.
 */
export function PartnershipFaq() {
  return (
    <Accordion defaultValue={[0]} className="border-t border-ink/20">
      {partnershipFaqs.map((item, index) => (
        <AccordionItem
          key={item.question}
          value={index}
          className="border-b border-ink/20 not-last:border-b"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="group flex w-full items-start justify-between gap-5 py-6 text-left transition-colors hover:text-rust focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust sm:py-7">
              <span className="grid grid-cols-[44px_1fr] gap-4 sm:grid-cols-[56px_1fr] sm:gap-6">
                <span
                  className="font-serif text-3xl leading-none font-semibold text-rust sm:text-4xl"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-2xl leading-7 font-bold text-slate-ink sm:text-3xl sm:leading-8">
                  {item.question}
                </span>
              </span>
              <ChevronDown
                className="mt-1 h-5 w-5 shrink-0 text-rust transition-transform duration-200 group-aria-expanded:rotate-180"
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
            <div className="pr-1 pb-7 pl-[60px] sm:pr-10 sm:pl-[80px]">
              <p className="max-w-[760px] text-base leading-8 text-[#454545]">
                {item.answer}
              </p>
            </div>
          </AccordionPrimitive.Panel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
