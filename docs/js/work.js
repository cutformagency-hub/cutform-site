/* YOUR PROJECTS. The first one in the list gets the big featured layout.

   Easiest way — a file in dist/videos/ only needs a title and the filename.
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
    video: "videos/full-video.mp4",
    poster: "videos/full-video.jpg"
  },
  {
    title: "reel",
    kind: "Reel",
    description: "whatever",
    credit: "Edit, motion & sound",
    duration: "00:41",
    ratio: "9/16",
    drive: "https://drive.google.com/file/d/1zBNLAlJJDwegrQ3157HmN4SzKfm4J6UL/view?usp=drivesdk",
    poster: "assets/work/project-poster.jpg",
    preview: "assets/work/project-preview.mp4"
  },
  {
    title: "reel",
    kind: "Reel",
    description: "another",
    credit: "Edit, motion & sound",
    duration: "00:38",
    ratio: "9/16",
    drive: "https://drive.google.com/file/d/1ZnBgz7M5NR7FaNXE0U6Py5AQIPTVJm-o/view"
  },
  {
    title: "Documentary",
    kind: "Documentary",
    credit: "Edit, motion & sound",
    video: "videos/documentary.mp4",
    poster: "videos/documentary.jpg"
  }
];
