# InfoTown website

Static website for **infotown.co.uk**. Plain HTML, one shared stylesheet, one small script. The pages are generated from a separate site source by `build.py`, but whatever is in this folder is the website.

## What's here

```
index.html                 Town Square (home page)
404.html                   "This parcel has no label" (page not found)
induction/index.html       Site Induction: Rex's first year, 12 stories and lessons
induction/NN-lesson-name/  Lessons 1 to 12, each ending with its story done the right way
induction/follow-the-process/ Follow the Process: requirement to handover, step by step
stories/index.html         All the stories
stories/NN-story-name/     Stories 1 to 12: the wrong way, read before each lesson
phrase-book/index.html     Every translation card in one place
visitor-centre/index.html  Meet the locals: who's who, and what ISO 19650 calls them
manifesto/index.html       The Manifesto
assets/infotown.css        Shared styles (colours, type, lesson layout)
assets/lesson.js           Route toggles, clickable explainers, reduced motion
assets/favicon.svg         Browser icon
```

## Preview on your computer

Open the folder in VS Code and use the Live Server extension, or run this from the folder:

```
python -m http.server 8000
```

Then go to http://localhost:8000. Opening the HTML files directly by double-clicking mostly works, but links to folders such as `induction/` only work through a server.

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

## The route

Town Square → Story 1 (the wrong way) → Lesson 1 (the lesson, then the same story done the right way) → Story 2 → … → Lesson 12 → Follow the Process.

## Changing a lesson or story

Edit the source fragments and run `python build.py` in the site source. It rebuilds every lesson, story and index page in this folder.
