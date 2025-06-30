# HeyChef

## AI Chef for Instant Recipes

A simple React + Cloudflare Pages app that generates recipes based on ingredients you have. Powered by the Hugging Face Inference API.

---

## Features

- Enter a list of ingredients and get a recipe using **only** those items.
- Clean, markdown-rendered recipe output.
- Secure serverless function to hide your API key.
- Easy deployment on Cloudflare Pages.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or later
- npm (comes with Node.js)
- A free Cloudflare Pages account
- A Hugging Face API token (read-only)

### Instructions

1. **Clone the repo**
   https://github.com/DeBoots-Nkuna/ai-chef-recipe-app.git
   cd heychef
2. Install dependencies

   `npm install`

3. Local development

   `npm run dev`

   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Configuration

1.In your Cloudflare Pages dashboard, go to Settings → Functions → Environment Variables.
2.Add a new Secret:

- **Name:** `HUGGINGFACE_API_KEY`
- **Value:** your Hugging Face token (starts with `hf_...`)

3. Ensure the file structue includes:

   ```
   .
   ├── functions/
   │   └── api/
   │       └── generate-recipe.js
   ├── src/
   │   ├── Main.jsx
   │   ├── IngredientList.jsx
   │   ├── Recipe.jsx
   │   └── ...
   ├── package.json
   └── vite.config.js

   ```

### Deployment

1. Push your changes to master or main branch:

   ```
   git add .
   git commit -m "Deploy HeyChef"
   git push origin main

   ```

2. Cloudflare Pages will automatically build and deploy your site.
3. Visit your live site at https://<your-project>.pages.dev.

### Usage

1. Add ingredients one-by-one in the form and click Generate Recipe.
2. Wait for the AI to cook up a recipe (a loading message appears).
3. View your markdown-rendered recipe in the browser.

### How It Works

- Frontend: React + Vite, uses fetch to call /api/generate-recipe.
- Backend: Cloudflare Pages Function (functions/api/generate-recipe.js) calls the Hugging Face Inference API.
- Markdown: Rendered using react-markdown.

## API Used

This app uses the [Hugging Face Inference API](https://huggingface.co/inference-api) to generate recipes from natural language prompts.
