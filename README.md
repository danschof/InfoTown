# InfoTown website

Static website for **infotown.co.uk**. Plain HTML, one shared stylesheet, one small script. There's no build step, so whatever is in this folder is the website.

## What's here

```
index.html                 Town Square (home page)
404.html                   "This parcel has no label" (page not found)
academy/index.html         The Academy: 12 lessons in four parts
academy/01-the-town/       Lesson 1  ✓
academy/02-the-buildings/  Lesson 2  ✓
academy/03-the-people/     Lesson 3  ✓
academy/06-the-labels/     Lesson 6  ✓
academy/07-roads-and-back-alleys/  Lesson 7  ✓
manifesto/index.html       The Manifesto
assets/infotown.css        Shared styles (colours, type, lesson layout)
assets/lesson.js           Route toggles, clickable explainers, reduced motion
assets/favicon.svg         Browser icon
```

`style.css` and `favicon.svg` in the root folder are from the first Manifesto page. Nothing uses them any more, so they can be deleted.

## Preview on your computer

Open the folder in VS Code and use the Live Server extension, or run this from the folder:

```
python -m http.server 8000
```

Then go to http://localhost:8000. Opening the HTML files directly by double-clicking mostly works, but links to folders such as `academy/` only work through a server.

## Publish with GitHub Pages

1. Commit and push to `main` (GitHub Desktop: **Commit to main**, then **Push origin**).
2. On GitHub, open the repo: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save**.
3. After a minute or two the site is live at `https://danschof.github.io/InfoTown/`. Check it there first.

The repo must be public for Pages on a free GitHub plan. Keep anything internal or organisation-specific out of it.

## Point infotown.co.uk at it

At your domain registrar's DNS settings:

| Type | Name / Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | danschof.github.io |

Remove any other A or CNAME records for `@` and `www` that the registrar added by default (parking pages).

Then:

1. On GitHub: **Settings → Pages → Custom domain**, enter `infotown.co.uk` and save. GitHub adds a `CNAME` file to the repo for you.
2. Wait for the DNS check to go green. It usually takes minutes, and can take up to a day.
3. Tick **Enforce HTTPS**.
4. Optional but recommended: verify the domain under your GitHub account's **Settings → Pages**, so nobody else can claim it.

## Adding a lesson

Each lesson is one `index.html` in its own folder, built from the same sections: scene, story, test, real town, term and reveal, translation card, take-away. Copy an existing lesson folder and change the content. Turn on its card in `academy/index.html` by changing the `lcard soon` block to a link.
