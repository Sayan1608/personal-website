# Sayan Sengupta Portfolio: A Junior Developer's Guide

This guide explains how the portfolio is organized, how its main features work, and where to make common changes. It assumes basic familiarity with JavaScript, HTML, and React, but explains the Next.js-specific pieces along the way.

## 1. What this project does

This is a single-page portfolio website built with:

- **Next.js 16 App Router** for pages, server rendering, and the chat API.
- **React 19** for reusable interface components and interactive controls.
- **TypeScript** for types and safer data handling.
- **Tailwind CSS 4's PostCSS integration** plus regular CSS in `app/globals.css`.
- **next-themes** for light and dark themes.
- **lucide-react** for icons.
- The **GitHub REST API** to find recent repositories.
- **OpenRouter** to send chat questions to a language model.

The profile and project data is shown on the home page. Visitors can also switch themes, upload a profile photo for their own browser, follow project links, and ask the profile assistant questions.

There is no database. Profile details live in TypeScript files, the recent repository list comes from GitHub, and the optional portrait is stored in the visitor's browser.

## 2. Project layout

```text
app/
  api/chat/route.ts       Server API endpoint for chatbot messages
  globals.css             Site-wide styles, themes, responsive layouts
  icon.svg                Browser tab icon
  layout.tsx              Shared HTML layout, metadata, providers
  page.tsx                The portfolio's home page and sections
components/
  profile-chatbot.tsx     Interactive chat window and launcher
  profile-portrait.tsx    Local photo upload, display, and removal
  section-heading.tsx     Reusable section title
  site-header.tsx         Desktop and mobile navigation
  theme-provider.tsx      next-themes wrapper
  theme-toggle.tsx        Light/dark mode button
data/
  github.ts               GitHub API fetch and repository filtering
  profile.ts              Profile, skills, work, and education data
public/
  profile.pdf             Downloadable profile document
```

Other important root files:

- `package.json` lists dependencies and common commands.
- `package-lock.json` pins installed package versions for repeatable installs.
- `tsconfig.json` enables strict TypeScript and the `@/` import alias.
- `postcss.config.mjs` connects Tailwind CSS 4 to PostCSS.
- `eslint.config.mjs` enables Next.js and TypeScript lint rules.
- `.gitignore` excludes `.env`, dependencies, build output, and other generated files.
- `.env` is a local environment configuration file. **Never copy its real values into source code, documentation, screenshots, or Git.**

## 3. How a request becomes a page

The App Router uses files in `app/` to define routes:

- `app/layout.tsx` is the shared outer layout.
- `app/page.tsx` is the `/` home page.
- `app/api/chat/route.ts` implements the `/api/chat` endpoint.

When a visitor requests `/`, Next.js runs the `Home` server component in `app/page.tsx`. It asks `data/github.ts` for recent repositories, then renders the sections and reusable components. `layout.tsx` wraps the page in the theme provider and adds the chatbot widget so it is available throughout the site.

The page is written as an async server component because it loads GitHub repository data before rendering. Most elements are rendered on the server. Components that need browser interaction declare `"use client"` at the top of their file; examples include the header, theme button, portrait editor, and chatbot.

## 4. The portfolio page

`app/page.tsx` renders the portfolio as one long page. Its navigation links are HTML fragment links such as `href="#about"`. Each destination must have the matching ID, for example `<section id="about">`. The header's links and page section IDs must stay in sync.

The sections are:

1. **Hero/home** — introduction, calls to action, social links, and portrait.
2. **About** — profile summary and location/focus details.
3. **Skills** — the grouped technical skills.
4. **Experience and education** — work timeline and education records.
5. **Projects** — the five newest owned, public, non-fork GitHub repositories.
6. **Achievements** — currently an honest empty state because no achievements are listed in the data.
7. **Contact** — email, telephone, profile document, and social links.

The home page uses `SectionHeading` for repeated section title structure, and Lucide icons for visual symbols. External links that open a new tab use `target="_blank"` and `rel="noreferrer"`.

### Updating profile content

Most factual content is in `data/profile.ts`:

- `profile` holds the name, title, location, contact links, GitHub/LinkedIn URLs, and biography paragraphs.
- `skillGroups` holds the skill group labels and their skill names.
- `experience` contains job entries. Optional properties such as `location` and `description` are only displayed when provided.
- `education` contains schools/programs and optional fields/dates.

When adding or changing an entry, keep the object fields consistent with the TypeScript types in that file. Check the corresponding section in `app/page.tsx` if you add a new kind of information; data won't appear automatically unless the page renders it.

## 5. Recent GitHub projects

`data/github.ts` makes a server-side request to the public GitHub repositories endpoint for the account `Sayan1608`. The endpoint is sorted by push time, descending. The code then:

1. Checks the HTTP response and verifies that the returned objects have the fields the site needs.
2. Keeps repositories owned by the account and filters out forks.
3. Takes the first five.
4. Maps GitHub's API field names into a smaller project type used by the page.
5. Caches the result for one hour using Next.js fetch revalidation.

`app/page.tsx` renders each repository as a card with its name, description, language, push date, and a link to GitHub. If the request fails, the page logs a server-side error and shows a fallback link rather than failing the whole portfolio.

If the GitHub account changes, update the `githubUsername` in `data/github.ts` and the public profile link in `data/profile.ts` so they agree. The one-hour cache means changes on GitHub might take up to an hour to appear.

## 6. The profile chatbot

The chatbot is split into a browser interface and a server endpoint:

### Browser interface: `components/profile-chatbot.tsx`

This client component controls whether the chat is open, keeps the current conversation in React state, shows suggestion buttons, and submits user messages to `/api/chat`. It displays a thinking indicator and gives the visitor a visible error when the request fails. The conversation is held in memory in the current page; it is not saved to a database or local storage.

The UI limits a message to 1,000 characters and sends up to the latest ten messages. It labels itself an AI profile assistant and includes a notice that the answers are AI-generated via OpenRouter and that the site itself does not save questions.

### Server endpoint: `app/api/chat/route.ts`

The browser must not call OpenRouter directly because doing so would expose the secret API key. Instead, the browser sends a same-site `POST` request to `/api/chat`; the Next.js server reads the key from its environment and makes the external request.

The route:

1. Limits requests to ten per minute per client address **in the current Node.js process**.
2. Checks request size, JSON validity, message count, roles, and message length.
3. Loads the profile facts, work, education, skills, and recent GitHub projects.
4. Adds those facts to the system instructions sent to the model.
5. Asks the model to answer only from the supplied facts and admit when something is not documented.
6. Returns a JSON reply or an explicit error response.

The selected model defaults to `openai/gpt-4o-mini`. A server-side `OPENROUTER_MODEL` environment variable can override it. The output is limited to 350 tokens, and the external request has a timeout.

The process-local rate limit is a simple safeguard, not a shared production-wide rate limiter. If the site is deployed across multiple server instances, use a shared rate-limit service/store for a reliable global limit.

## 7. Themes, navigation, and the profile photo

- `components/theme-provider.tsx` wraps `next-themes` so the chosen theme is applied to the document.
- `components/theme-toggle.tsx` switches between light and dark mode. `app/globals.css` defines the theme colors as CSS variables and changes them when the `.dark` class is present.
- `components/site-header.tsx` renders the desktop navigation and mobile menu. It closes the mobile menu when a link is selected.
- `components/profile-portrait.tsx` allows a visitor to choose a local image. The image is cropped square and converted to a smaller WebP data URL before it is saved in that visitor's `localStorage`. It is not uploaded to the website. Removing browser storage or using another browser/device removes/does not carry over that photo.

## 8. Styling and responsive behavior

`app/globals.css` imports Tailwind CSS, then defines the portfolio's design using custom CSS. Most of the layout is ordinary CSS rather than utility classes:

- CSS variables set the background, surfaces, text colors, borders, accent, and fonts.
- Reusable classes define the site shell, header, cards, timeline, sections, chatbot, and footer.
- Media queries adjust the layout for smaller screens, including the mobile navigation and single-column sections.
- `scroll-behavior`, `scroll-padding-top`, and the sticky header work together so section links scroll smoothly without hiding headings under the header.
- A reduced-motion media query reduces animations when a visitor requests less motion from their operating system.

When adding a new visual feature, first look for an existing class or component pattern that can be reused. Test the result at both a narrow phone width and a wide desktop width.

## 9. Local setup and common commands

Use a current Node.js release compatible with the installed Next.js version. From the project directory:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000` in a browser. To stop the development server, focus its terminal and press `Ctrl+C`.

Useful project commands:

```powershell
npm run typecheck  # Check TypeScript types
npm run lint       # Run ESLint
npm run build      # Create an optimized production build
npm run start      # Serve the production build (run build first)
```

The development server reads `.env` when it starts. When you change environment values, restart/reload the server if Next.js does not pick them up automatically.

## 10. Environment variables and secrets

The chatbot needs an OpenRouter API key configured on the server. The local `.env` should contain a line like this, using your own valid key:

```dotenv
OPENROUTER_API_KEY=replace_with_your_private_key
```

Optional server configuration:

```dotenv
OPENROUTER_MODEL=openai/gpt-4o-mini
NEXT_PUBLIC_SITE_URL=https://your-deployed-site.example
```

`OPENROUTER_MODEL` changes the model used by the API route. `NEXT_PUBLIC_SITE_URL` supplies the site URL sent as OpenRouter request metadata; despite the `NEXT_PUBLIC_` name, it is not a secret. Never give a secret variable a `NEXT_PUBLIC_` prefix, since such variables may be included in browser code.

The `.gitignore` excludes `.env`. Keep it that way, and configure the same variables in your hosting provider's secret/environment settings for production. Do not put real keys in `tutorial.md`, source files, screenshots, or commits. If a key is exposed, revoke it and create a replacement.

## 11. How to check a change

Before considering a change complete:

1. Run `npm run typecheck`.
2. Run `npm run lint`.
3. Run `npm run build` to confirm the production build still succeeds.
4. Open the page and test the affected feature. For layout work, check phone and desktop widths.
5. For chatbot changes, test a supported profile question, a question whose answer is not in the profile, and a failure case (for example, a missing/invalid provider key). Confirm that the API key never appears in browser requests or client source.

The chat API currently returns HTTP 400 for malformed messages, 413 for an oversized request, 429 when the process-local request limit is hit, 503 if the OpenRouter key is missing, and 502 when the provider fails or gives an invalid response.

## 12. Good next steps

- Keep job dates and profile facts accurate in `data/profile.ts`.
- Add project descriptions only when they can be verified from the repositories.
- Consider moving frequently edited profile content into a content file or CMS if updates become frequent.
- Consider shared rate limiting and monitoring before exposing the chatbot to significant public traffic.
- Keep dependencies updated and re-run the checks above after upgrades.
