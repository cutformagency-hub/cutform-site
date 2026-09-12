# Add your videos to Cutform

Open `dist/js/work.js`. Each project is one entry in the list. The site replaces the “Next up” panel with your real projects automatically as soon as a valid entry is present.

## Google Drive

1. Open a video in Drive. Choose Share and give your intended visitors permission to view it. For a public portfolio, the video needs “Anyone with the link” viewer access. Only use work you have permission to show publicly.
2. Copy the sharing link.
3. Add an entry like this inside the square brackets in `work.js`:

```js
{
  title: "Your actual project name",
  kind: "Reel",
  credit: "Edit, motion & sound",
  description: "One or two sentences: what it was for, and your contribution.",
  duration: "00:24",
  ratio: "9/16",
  drive: "YOUR_GOOGLE_DRIVE_SHARING_LINK",
  poster: "assets/work/project-01.jpg",
  feature: false
},
```

The site converts Drive sharing links into embedded previews. The viewer can also choose “Open original” if Drive requires sign-in, blocks playback, or the embed does not load. Drive controls video availability and processing; the site cannot override its access settings.

## Thumbnails and preview clips

Create `dist/assets/work/` and put your thumbnail there. Use a real frame from the video; a portrait thumbnail works well for a portrait reel. Set `poster` to the matching path. If you omit the poster or it cannot load, a numbered slate appears.

Optional: add `preview: "assets/work/project-01-preview.mp4"` for a short silent local MP4 that plays on hover or keyboard focus. Preview files should be small and contain no audio. No preview downloads until interaction. Previews are disabled for visitors who prefer reduced motion.

Set `feature: true` on your strongest project to give it a wide featured row. Set `ratio` to `"9/16"`, `"16/9"`, `"1/1"` or `"4/5"` to match the video.

You can use `youtube: "VIDEO_ID_OR_HTTPS_URL"`, `vimeo: "VIDEO_ID_OR_PUBLIC_URL"`, or `video: "assets/work/video.mp4"` instead of `drive`. Use one video source per entry. Vimeo private/unlisted hash links are not supported by this simple config; use a public Vimeo URL or Drive/YouTube instead.

## Contact

The form prepares an email to `cutform.agency@gmail.com`. It does not store enquiries or send anything automatically. The visitor reviews and sends the email through their own mail app. The copy option works when no mail app is configured.

## Hosting elsewhere

The `dist` folder is the complete deployable site. Upload its contents to your hosting provider. Update the canonical URL, `og:url`, and absolute `og:image` URL in `dist/index.html` to the real public address before sharing the public site. The supplied social-preview image is retained.

The original Downloads folder has not been edited. This is the enhanced copy.
