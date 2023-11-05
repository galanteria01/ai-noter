import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQAccordian() {
  return (
    <Accordion type="single" collapsible className="w-full px-8">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it free?</AccordionTrigger>
        <AccordionContent>
          Yes. It is free to use for small use-cases.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can it generate thumbnails?</AccordionTrigger>
        <AccordionContent>
          Yes, It does generate thumbnails images using DALL-E API
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it Open-source?</AccordionTrigger>
        <AccordionContent>
          Yes it is open-source and can be found at{" "}
          <a className="font-semibold text-indigo-600 hover:underline" href="https://github.com/galanteria01/ai-noter">
            Github
          </a>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
