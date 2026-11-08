# ADEN.exe: Aden Malik's portfolio

A cinematic, dark, multicolour portfolio built with plain HTML, CSS and JavaScript (no build step, no dependencies).
Node.js is used only for a tiny local server.

## Run it locally
```bash
cd aden-portfolio
npm start          # or: node server.js
# open http://localhost:3000
```

## Folder structure
```
aden-portfolio/
├── index.html            page markup (all sections)
├── css/style.css         all styling, themes, animations
├── js/config.js          YOUR SETTINGS: links, images, intro options  <-- edit this
├── js/main.js            logic: intro film, sound, scenes, cursor, scroll effects
├── assets/
│   ├── images/           portrait-cutout.webp, studio-photo.webp, paper-cover.webp
│   │   ├── gallery/      your 6 gallery photos
│   │   └── achievements/ photos for the 7 achievement cards
│   ├── docs/             resume.pdf, white-paper PDF
│   └── audio/            optional intro music
├── server.js             dependency-free static server
└── package.json
```

## Where to add your things (all in `js/config.js`)
| What | Setting | Example |
|---|---|---|
| Resume (Download resume button) | `resume` | `'assets/docs/resume.pdf'` |
| White-paper PDF (Read research button) | `paper` | `'assets/docs/dpdp-white-paper.pdf'` |
| GitHub | `github` | `'https://github.com/yourname'` (not added yet) |
| Kaam Book logo | `kaamLogo` | `'assets/images/kaambook-logo.png'` |
| 6 gallery frames | `gallery` | `['assets/images/gallery/campus.jpg', ...]` |
| 7 achievement photos | `ach` | `['assets/images/achievements/judge.jpg', ...]` |
| Intro length | `introSeconds` | `26.5` |
| Intro music (only if you own the rights) | `music`, `musicStart` | `'assets/audio/intro.mp3'`, `13` |

LinkedIn and Instagram are already set. Empty gallery and achievement slots also accept photos by clicking them in the browser, but those are previews on that device only. Put the files in `assets/` and list them in `config.js` to make them permanent.

## Edit the content
- **Text, sections, achievements, RaddiWallah flashcards, Kaam Book description:** `index.html`
- **Intro cards (the words shown in the opening film):** the `CARDS` array in `js/main.js`
- **Scroll colour palettes:** the `PAL` object in `js/main.js`
- **Beat and sound design:** the `S.*` sound functions and `step()` in `js/main.js` (sounds are generated live with the Web Audio API, so no audio files are needed)

## Deploy
- **Vercel:** push the folder to GitHub, import it in Vercel, preset "Other", no build command, output directory `.` (or run `npx vercel` in the folder).
- **Netlify:** drag and drop the folder at app.netlify.com/drop.
- **GitHub Pages:** push and enable Pages on the main branch (root).

## Notes
- Sound starts only after a click (browser rule). "Play without sound" and the sound toggle always work.
- Reduced-motion settings are respected (the intro jumps to its final scene).
- `mailto:` and `tel:` buttons open the mail app and dialer in a normal browser; the address or number is also copied as a fallback.

---

## Run in VS Code (step by step)

1. Unzip, then in VS Code choose **File → Open Folder…** and pick the `aden-portfolio` folder (the one that contains `index.html`).
2. Pick one of these ways to run it:
   - **Node server (recommended):** open the terminal (**Terminal → New Terminal**) and run `npm start`, then open http://localhost:3000 . Needs Node.js 16+ (https://nodejs.org). There is nothing to install: no `npm install` needed.
   - **Live Server extension:** install "Live Server" (ritwickdey), right-click `index.html` → **Open with Live Server**. The page reloads whenever you save a file.
   - **Debug in Chrome:** press **F5** (uses `.vscode/launch.json`, starts the server for you).
3. Edit `js/config.js` for links and photos, `index.html` for text, `css/style.css` for looks, `js/main.js` for the intro and animations. Save, then refresh the browser.

Tips
- Always run it through a server (options above) rather than double-clicking `index.html`, so fonts, images and audio load properly.
- Browsers can't open an Apple Pages file. Export your skillset/resume as a PDF, put it in `assets/docs/` and set `resume` in `js/config.js` to that PDF.
- Keep the folder structure as it is: `css/`, `js/`, `assets/`.

---

## Deploy on Vercel (via GitHub)

1. Put the project on GitHub so that **`index.html` is at the top level of the repo** (not inside another folder), with `css/`, `js/` and `assets/` next to it:
   ```bash
   cd aden-portfolio
   git init
   git add .
   git commit -m "Aden portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
   (Uploading through the GitHub website? Drag the whole folder contents in, including the `css`, `js` and `assets` folders. Selecting only files uploads just the top level.)
2. On vercel.com choose **Add New → Project**, import the repo.
3. Keep **Framework Preset: Other**, leave **Build Command** and **Output Directory** empty (the included `vercel.json` already sets this).
4. If your repo has the project inside a sub-folder, set **Root Directory** to that sub-folder.
5. Deploy. `server.js` and `package.json` are only for running locally; Vercel serves the files as a static site.

If the page looks unstyled: open the live site, press F12, go to the Network tab, reload, and look for red 404 lines (usually `css/style.css`, `js/main.js`). That means those folders are missing from the repo or Root Directory is wrong.
