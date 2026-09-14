/* YOUR PROJECTS. The first one in the list gets the big featured layout.

   Easiest way — a file in docs/videos/ only needs a title and the filename.
   The site reads the length, the shape and a thumbnail frame out of the file:

     { title: "Name of the edit", kind: "Reel", video: "videos/name.mp4" },

   A Google Drive video needs its sharing link, set to "Anyone with the link".
   Its thumbnail comes from Drive on its own:

     { title: "Name of the edit", kind: "Reel", drive: "https://drive.google.com/file/d/..." },

   Or run add-videos.cmd in the site folder and it writes these lines for you.

   THUMBNAILS. Save a picture next to the video with the same name --
   videos/name.mp4 and videos/name.jpg -- then run add-videos.cmd and it is
   picked up. Without one, the site uses a frame from the video itself.

   NEVER copy poster: or preview: from another entry. Those point at that
   entry's own picture files, which is why a copied block shows the wrong
   thumbnail. Leave them out and each video supplies its own.

   Everything else is optional: description, credit, duration, ratio,
   still (seconds — which frame to use as the thumbnail), feature: true.
   Instead of drive you can also use youtube or vimeo.                      */
const CUTFORM_WORK = [
  {
    title: "Need and editor?",
    kind: "Reel",
    credit: "Edit, motion & sound",
    duration: "00:10",
    ratio: "9/16",
    video: "videos/full-video.mp4",
    poster: "videos/full-video.jpg"
  },
  {
    title: "reel",
    kind: "Reel",
    credit: "Edit, motion & sound",
    duration: "00:41",
    ratio: "9/16",
    video: "videos/reel-01.mp4",
    poster: "assets/work/project-poster.jpg",
    preview: "assets/work/project-preview.mp4"
  },
  {
    title: "reel",
    kind: "Reel",
    credit: "Edit, motion & sound",
    duration: "00:38",
    ratio: "9/16",
    video: "videos/reel-02.mp4",
    poster: "videos/reel-02.jpg"
  },
  {
    title: "Documentary",
    kind: "Documentary",
    credit: "Edit, motion & sound",
    duration: "01:06",
    ratio: "16/9",
    video: "videos/documentary.mp4",
    poster: "videos/documentary.jpg"
  },
  {
    title: "one must imagine sisyphus happy",
    kind: "Reel",
    credit: "Edit, motion & sound",
    duration: "02:02",
    ratio: "9/16",
    video: "videos/sisyphus.mp4",
    poster: "assets/work/onemust.jpg"
  },
  {
    title: "ad",
    kind: "Reel",
    credit: "Edit, motion & sound",
    duration: "00:22",
    ratio: "9/16",
    video: "videos/ad-01.mp4",
    poster: "videos/ad-01.jpg"
  },
  {
    title: "ad",
    kind: "Reel",
    credit: "Edit, motion & sound",
    duration: "00:42",
    ratio: "9/16",
    video: "videos/ad-02.mp4",
    poster: "videos/ad-02.jpg"
  },
  {
    title: "ad",
    kind: "Reel",
    credit: "Edit, motion & sound",
    duration: "00:46",
    ratio: "9/16",
    video: "videos/ad-03.mp4",
    poster: "assets/work/oldguy.jpg"
  },
  {
    title: "ad",
    kind: "Reel",
    credit: "Edit, motion & sound",
    duration: "00:34",
    ratio: "9/16",
    video: "videos/ad-04.mp4",
    poster: "videos/ad-04.jpg"
  },
  {
    title: "ad",
    kind: "Reel",
    credit: "Edit, motion & sound",
    duration: "00:42",
    ratio: "9/16",
    video: "videos/ad-05.mp4",
    poster: "assets/work/ad_screensht.jpg"
  }
];
