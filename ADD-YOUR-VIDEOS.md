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
  description: "whatever.",
  duration: "00:24",
  ratio: "9/16",
  drive: "https://drive.google.com/file/d/1zBNLAlJJDwegrQ3157HmN4SzKfm4J6UL/view?usp=drivesdk",
  poster: "assets/work/project-01.jpg",
  feature: false
},
```

The site converts Drive sharing links into embedded previews. The viewer can also choose “Open original” if Drive requires sign-in, blocks playback, or the embed does not load. Drive controls video availability and processing; the site cannot override its access settings.

## Thumbnails and preview clips

Create `dist/assets/work/` and put your thumbnail there. Use a real frame from the video; a portrait thumbnail works well for a portrait reel. Set `poster` to the matching path. If you omit the poster or it cannot load, the site tries a Drive or YouTube thumbnail automatically. If the provider also cannot supply a thumbnail, a branded frame appears. Vimeo and local files need a supplied poster for a photographic thumbnail.

Optional: add `preview: "assets/work/project-01-preview.mp4"` for a short silent local MP4. The most visible preview can play automatically when its frame comes into view; hover or keyboard focus also starts it. Only one preview plays at a time. Preview files should be small and contain no audio. Previews are disabled for visitors who prefer reduced motion. Your first reel now includes a real frame and a six-second silent preview derived from the supplied Drive video.

The first project automatically gets the large featured layout. Add `feature: true` to any additional project that deserves the same treatment. Other projects form an offset two-column contact sheet on larger screens and adapt to smaller screens. Set `ratio` to `"9/16"`, `"16/9"`, `"1/1"` or `"4/5"` to match the video. The images and preview clips show the complete frame rather than cropping out your editing.

You can use `youtube: "VIDEO_ID_OR_HTTPS_URL"`, `vimeo: "VIDEO_ID_OR_PUBLIC_URL"`, or `video: "assets/work/video.mp4"` instead of `drive`. Use one video source per entry. Vimeo private/unlisted hash links are not supported by this simple config; use a public Vimeo URL or Drive/YouTube instead.

## Contact

The primary action opens Gmail in a new tab with `cutform.agency@gmail.com`, a subject and the visitor's project details filled in. Visitors can select Outlook or their configured email app instead. A sign-in may be needed. The site never sends the email automatically. The Instagram link opens a message conversation with `cutform.agency`; Instagram may require sign-in. Visitors can copy their brief and paste it into the conversation.

## Languages and number of videos

There is no hard limit on the number of entries in the list. All valid entries appear; thumbnails load lazily and the full player is only created when a visitor clicks. A very large collection will still make the page long, so put your strongest projects first.

Videos play inside a dialog on your site. Visitors only leave for Drive if they choose “Open original” or their browser does not support the in-page dialog.

The language button switches English and Arabic, including controls, form messages and right-to-left layout. It remembers the visitor's choice on their device. Project names and descriptions stay in their original language unless you add the optional fields `titleAr`, `descriptionAr`, `kindAr` and `creditAr` to an entry. These contain your own Arabic translations; the site does not machine-translate your projects.

## Hosting elsewhere

The `dist` folder is the complete deployable site. Upload its contents to your hosting provider. Update the canonical URL, `og:url`, and absolute `og:image` URL in `dist/index.html` to the real public address before sharing the public site. The supplied social-preview image is retained.

The original Downloads folder has not been edited. This is the enhanced copy.
