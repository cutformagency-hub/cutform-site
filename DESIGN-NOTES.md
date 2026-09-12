# Cutform — design and research notes

## Decisions

The opening is an editable-feeling title sequence: visitors can scrub through hook, rhythm and feeling. It is deliberately started by the visitor, not an autoplaying distraction. Typography and the supplied Cutform mark carry the identity; no stock work, generated project images, client logos, testimonials, awards or performance claims were invented.

The black and champagne palette remains. Large sans-serif type contrasts with italic Newsreader, and editing-inspired rules, timecode and rectangular clips replace decorative card grids. “Would you believe in us?” remains intact as the emotional close on a full gold section.

Services explain concrete work. Process copy explains the scope/price/timing conversation without inventing prices or delivery promises. The contact brief helps visitors describe a project and prepares an email, with a copy fallback. The work section is designed to take actual videos later and is honest about the current empty state.

## Research informing the choices

- [Ordinary Folk](https://www.ordinaryfolk.co/): the current home page pairs a short studio introduction with directly named work and visible contact information. Application here: reserve prominence for projects and keep the studio introduction compact. This is a design observation, not evidence of conversion rates.
- [BUCK](https://buck.co/work): its portfolio is centred on project work. Application here: real project titles, short descriptions and credits become the evidence once videos are added. This is inspiration for hierarchy, not a copied layout.
- [Nielsen Norman Group: concise, scannable and objective web writing](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/): the study found usability benefits from these writing properties in its tested informational pages. Application here: shorter copy, descriptive services and no inflated claims. It is an older study of usability, not a promise that this portfolio will gain a particular number of clients.

## Practical limits

The portfolio needs your real videos to demonstrate your craft. Google Drive playback depends on the video's access settings and Drive's player. The contact flow opens Gmail or Outlook in the browser, with a configured mail app as an alternative. There is also a direct Instagram message link. No backend submission service or enquiry database is configured.

The follow-up additions preserve the original design: English/Arabic selection with right-to-left layout, a section-aware scroll playhead, restrained heading reveals, and title animations whose position follows the timeline. Reduced-motion preferences are respected. Language changes preserve the visitor's form input.

The gallery now gives the first edit a large framed presentation, with a sharp complete video frame over a softened background derived from that same frame. Additional edits use an offset contact sheet. The first supplied reel includes its actual thumbnail and a six-second silent preview; the full video remains hosted on Drive. Future Drive and YouTube entries can fall back to their provider thumbnails when a local poster is absent.

Desktop English and Arabic layouts, the featured gallery and the embedded Drive player were inspected in the browser. Local checks also cover references, HTML structure, JavaScript syntax, media links, email drafts, language switching without losing form input, seekable title animation and a 37-item gallery. Responsive layouts are included; a full mobile-device test was not performed.

## The final pass

The opening behaves like a title card rather than a text swap. Every beat change
is a cut: the glyphs bloom for two or three frames, a brief colour split fringes
them in gold and cyan, the whole block whips in and settles, and then the line
assembles letter by letter out of blur with a highlight that travels across the
word like a light passing over it. Each effect is applied to the letters
themselves rather than painted over them as an overlay, so nothing shows its own
rectangle. Every animation stays paused and is positioned by the timeline, so
scrubbing backwards looks exactly like scrubbing forwards. Arabic takes the same
motion at the word level: splitting Arabic into characters would break the joins
that hold a word together, so it is never split. The transport button pulses once
before first use and becomes a replay once the six seconds are up.

Under `prefers-reduced-motion` the change still happens, as a cross dissolve with
no movement, blur or glow. That preference is common on Windows machines with
animation effects switched off, and suppressing the sequence entirely made the
opening look broken rather than considerate.

Work plays on the site. A file in `docs/videos/` takes priority over the same
project's Drive link, plays in the page with native controls, and shows no route
off the page at all; without a poster it uses its own first frame as the
thumbnail. Drive and YouTube entries still play in place and keep a single quiet
fallback line for the case where the provider blocks embedded playback.

## Writing the Arabic

The Arabic is written as Arabic, not carried across from the English. The
reference points were the register Arab brands actually use on the web: short
sentences, active voice, everyday vocabulary, and the loanwords people in this
industry really say — مونتاج، تايم لاين، أفتر إفكتس، ريلز، بريف. Guidance came
from Baianat's Arabic content guide (use the active voice; replace difficult
words with ones every reader understands) and from how Arabic video production
studios phrase their own pages: direct questions and plain imperatives rather
than literary construction.

The first draft failed on exactly those points. It used literary MSA (تلك صنعة,
يُقفل كل شيء في مكانه), calqued English idiom (بداية تُوقف الإبهام, from "stop
the thumb"), decorative tashkeel, and passive forms. None of it is how anyone
speaks.

The rewrite leans on the white-dialect register that reads naturally across the
Arab world. The opening is one repeated construction rather than a translated
line — خلّيهم يكملوا / خلّي الإيقاع يشدّهم / خلّيهم يحسّوا — and the same voice
carries the headings: خلّي الشغل يتكلم، اللقطات عندك والباقي علينا، من يردّ
عليك هو من يشتغل على فيديوك، فهل تعطينا فرصة؟، ووقت يكفي حتى تطلع صح. English
and Arabic now say the same thing in their own words, which means the two are
intentionally not line-for-line equivalents.

## Scale and the work grid

An earlier version sized each tile to its video: portrait cards ran 550x688 at a
1280px window, a 16:9 entry took the full width at 1142px, and the featured card
was a rotated slab. Every card filled most of a screen, and a grid of mixed
shapes read as clutter rather than a body of work.

The grid is now one shape, three up, with the media fitted inside a 4:5 frame
over its own blurred backdrop. Tiles are 363x454 at the same window. The
featured treatment is gone: the work is presented as an even set and only
becomes large when someone opens it, which is the pattern restrained studio
portfolios settle on. Tiles fade up as they are reached, staggered by column,
and hold still under reduced motion.

The player takes the shape of the video rather than a default. A self-hosted
file reports its own dimensions, so a landscape cut opens in a wide frame and a
reel in a tall one; before this, a 16:9 documentary opened in the narrow
vertical player meant for reels.
