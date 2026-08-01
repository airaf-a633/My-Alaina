# A Herbarium of Us — for Alaina

A scroll-through keepsake site. The conceit is a book of pressed flowers: every
memory is a specimen taped to the page, and a bouquet in the corner gains one
flower for each memory she scrolls past. At the last section the finished
bouquet is handed over.

## Running it

```bash
npm run dev
```

Then open http://localhost:3000

## Editing it

**`content.ts` is the only file you need to touch.** Every word she reads lives
there. Anything marked `PLACEHOLDER` is my writing, not yours — those need
replacing before you send her the link.

`media.ts` lists the photos and videos. It's already filled in from
`/public/images`.

## The page, in order

| Section   | What it is                                                 |
| --------- | ---------------------------------------------------------- |
| Hero      | Title card with her name and a drifting petal or two        |
| Letter    | Your opening note, taped to the page                        |
| Memories  | Four specimens. **Each one adds a flower to the bouquet.**  |
| Interlude | "Teri harr ada qatilana" — the one dark screen on the page  |
| Clips     | Your videos. Autoplay muted, tap the speaker for sound      |
| Gallery   | All 43 photos in a masonry, nothing cropped                 |
| Reasons   | Tap a flower, a reason opens inside                         |
| Wallet    | The childhood photo, and the line about your daughter       |
| Closing   | The full bouquet, and your signoff                          |

## Deploying it

Easiest is Vercel — same company that makes Next.js, and the free tier covers
this comfortably.

```bash
npx vercel
```

Follow the prompts and it gives you a URL you can send her.

One thing to know: the site will be **publicly reachable** by anyone with the
link. It won't be meaningfully indexed by Google, but it isn't private either.
If that matters, Vercel's dashboard has a password-protection setting, or you
can keep it local and show her on your laptop.

## Details worth knowing

- **Mobile first.** Responsive down to 375px and checked for horizontal
  overflow. Photos are served at phone-appropriate sizes — a 940 KB original
  goes out as roughly 77 KB.
- **Reduced motion is respected.** If she has "reduce motion" on in her phone
  settings, petals disappear, reveals become simple fades, and videos show
  controls instead of autoplaying.
- **Videos pause off-screen** so they don't drain her battery or data.
- **The song plays once, in full**, when she reaches the *Teri harr ada
  qatilana* screen, and never restarts if she scrolls back. Swap the track by
  replacing `public/audio/qatilana.mp3`.

  Browsers refuse to start audio on a page nobody has touched yet — that's a
  platform rule no code gets around. So the first time she taps *anything*
  (the "Start here" link, a flower, a clip), the player is quietly primed, and
  the song then starts on its own. Only if she scrolls the entire way without a
  single tap does a small "Tap to hear it" button appear instead. A "Stop"
  control sits in the corner while it plays.
- **It still reads without JavaScript**, just without the animation.
