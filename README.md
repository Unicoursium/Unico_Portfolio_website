# Unico Yin — Design Engineering Portfolio

A responsive, English-language personal portfolio built with plain HTML, CSS and JavaScript. Includes original SVG illustrations, project filtering, project reading dialogs, light/dark themes and reduced-motion support.

**Content status:** the four project studies are explicitly labelled illustrative placeholders. Actual project material and contact details will be added later.

## Project structure

```text
portfolio_website/
├── .gitignore
├── README.md
└── docs/                       # GitHub Pages publishing directory
    ├── .nojekyll               # Serve files directly, without Jekyll
    ├── index.html             # Page structure and personal introduction
    └── assets/
        ├── favicon.svg
        ├── css/
        │   └── style.css      # Typography, colours, layout and responsive styles
        ├── images/            # Future project photos and other image assets
        └── js/
            ├── projects.js    # Project titles, categories and case-study text
            ├── art.js         # Original procedural SVG illustrations
            └── app.js         # Rendering, filtering, dialogs, theme and motion
```

`docs/` contains the complete deployable website. Repository documentation and Git configuration stay outside the published directory. No Node.js packages, build process, secrets or server backend are required.

## Local preview

From the repository root:

```sh
python3 -m http.server 8080 --directory docs
```

Visit <http://localhost:8080/>. If that port is in use, choose another one, for example `8081`.

## Publish with GitHub Pages

Repository: <https://github.com/Unicoursium/Unico_Portfolio_website>

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Select branch **main** and folder **/docs**, then click **Save**.
4. Wait for the Pages deployment to finish. Its status appears in the repository's **Actions** tab and the published URL appears in **Settings → Pages**.

Expected URL once Pages is enabled and the deployment succeeds:

<https://unicoursium.github.io/Unico_Portfolio_website/>

After the one-time Pages setup, commits pushed to `main` that update `docs/` will publish automatically. This project uses the native branch publishing option; no custom Actions workflow or additional deployment token is needed.

```sh
git add docs README.md .gitignore
git commit -m "Update portfolio"
git push origin main
```

For GitHub's publishing-source instructions, see [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Editing content

- **Identity and page copy:** edit `docs/index.html`.
- **Projects:** edit the `projects` array in `docs/assets/js/projects.js`. Mark illustrative placeholders with `demo: true`; only real projects (without that flag, or with `demo: false`) contribute to the homepage portfolio total. Until real projects are added, the homepage shows a coming-soon message. Each item has a unique `id`, a title, a filter category, a label, a background colour and case-study text.
- **Visuals:** the current sample illustrations come from `art()` in `docs/assets/js/art.js`. Add real photographs to `docs/assets/images/` and update rendering in `docs/assets/js/app.js` when replacing the sample artwork. Adding a photograph to the folder alone does not display it.
- **Styling:** edit `docs/assets/css/style.css`. Theme colours are defined at the top.
- **Project count:** when adding or removing projects, update the initial counts in `docs/index.html` as well. Filter results are calculated dynamically.

Scripts load in order: `projects.js`, `art.js`, then `app.js`. Keep this order when editing the page.

Use relative asset links such as `./assets/images/project-name.jpg`, rather than `/assets/...`. This keeps the site working both under the repository subpath and on a future personal domain. Projects use fragment links such as `#project/fold`, so refreshing a project does not require a server-side routing fallback.

## Custom domain, later

No custom domain is configured. When ready:

1. Add the domain in **Settings → Pages → Custom domain**.
2. Configure DNS with your domain provider using [GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
3. For branch publishing, keep the generated `CNAME` file inside `docs/` and commit it to `main`.
4. Enable **Enforce HTTPS** when GitHub makes it available.

Do not add a placeholder `CNAME` file; it should contain only the domain you actually own and intend to use.

## Technical notes

- DM Sans and Space Mono load from Google Fonts; local fallback fonts are supplied.
- SVG illustrations are generated locally in the browser and require no image service.
- Theme preference is stored in the visitor's browser using `localStorage`.
- The contact area is a labelled placeholder, not a working message form.
- The London clock uses the `Europe/London` time zone, including daylight-saving changes.

## Quick checks before pushing

```sh
node --check docs/assets/js/projects.js
node --check docs/assets/js/art.js
node --check docs/assets/js/app.js
git diff --check
```

Node.js is optional and is used here only for syntax checks. Preview the site locally after visual or interaction changes, including a narrow screen, project filters, project dialogs and the theme toggle.
