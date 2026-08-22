# Getting a real testimonial

Send this to Saurabh Yadav (UpHomeTuition). Adjust the tone to how you actually
talk to him — it should sound like you, not like a template.

---

Hi Saurabh,

I'm putting together a proper site for my freelance work, and UpHomeTuition is
the project I'm leading with — it's the one that's live and being used.

Would you be up for writing two or three lines about what it was like working
with me? Honest is better than glowing — the specific stuff is what people
actually believe. If it helps, anything along these lines:

- what state things were in before, and what changed
- whether it got delivered when I said it would
- what I was like to work with when something needed changing
- whether you'd hire me again

If a star rating out of 5 is easier than writing, that works too — I'd put it
next to your name and role (founder, UpHomeTuition). Happy to show you exactly
how it'll appear before anything goes live.

No pressure at all if you'd rather not.

Thanks,
Prashant

---

## When he replies

Paste it into `testimonials` in `src/data/site.ts`:

```ts
export const testimonials: Testimonial[] = [
  {
    quote: 'exactly what he wrote, unedited except for trimming',
    name: 'Saurabh Yadav',
    role: 'Founder, UpHomeTuition',
    rating: 5,            // only if he actually gave one
    source: 'WhatsApp, Aug 2026',   // optional, but it makes it checkable
  },
]
```

The section appears automatically once the array is non-empty, and renders
nothing while it's empty.

**Do not write this quote yourself.** A fabricated endorsement attributed to a
real, named person is the one thing on this site that could be called fraud, and
it is trivially disproved by asking him. Every other claim here is true, which is
exactly why the site reads as credible.

Two more worth asking, once you have his:
- Uddeshhya — whoever ran the org when you built it
- Any of the smaller paid builds
