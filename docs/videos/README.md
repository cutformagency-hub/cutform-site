# videos/

Drop your finished video files in this folder, then point a project at one in
`docs/js/work.js`:

```js
{
  title: "Ramadan spot",
  kind: "Reel",
  credit: "Edit, motion & sound",
  duration: "00:41",
  ratio: "9/16",
  video: "videos/ramadan-spot.mp4",
  poster: "videos/ramadan-spot.jpg"
}
```

Rules the site follows:

- `video:` wins over `drive:`. If an entry has both, the file in this folder
  plays and Drive is never touched. Keep `drive:` as a quiet backup.
- Paths must start with `videos/` or `assets/`. No `../`.
- MP4 (H.264 + AAC) plays everywhere. Keep each file under ~25 MB if you push
  it to GitHub; the hard limit per file on GitHub is 100 MB.
- For anything bigger, use Git LFS or leave that one on `drive:`.
- `poster:` is the still frame shown before play. A real frame from the video
  works best. It can live in this folder too.
- `preview:` can point at a short silent clip here as well, for the hover /
  in-view preview on the card.

Nothing in this folder is required. Files here are served at the site root, so
`docs/videos/x.mp4` is reachable as `videos/x.mp4`.
