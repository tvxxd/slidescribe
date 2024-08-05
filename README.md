# Slidescribe

Slidescribe is a Notes app that allows users to manage their notes. Users can add, update, and delete notes with a draggable interface. Customization options for note colors and real-time updates make it a flexible tool for organizing thoughts and ideas.

## Technologies

- React.js
- Tailwind CSS
- Supabase

## Features

- Draggable notes: Easily move notes around the workspace.
- Customizable Cards: Update note content and change card colors.
- Supabase Integration: Stores notes with Supabase.

## Usage

- Add Notes: Click the "+" button to create a new note.
- Edit Notes: Click on a note to update its content or change its color.
- Drag and Drop: Move notes around the workspace as needed.
- Delete Notes: Use the delete option to remove unwanted notes.

## Install

```bash
git clone https://github.com/tvxxd/slidescribe.git
cd slidescribe
npm install
```

## Configure Supabase

1. **Sign in to Supabase:**

   - Go to [Supabase](https://supabase.io/) and sign in to your account.

2. **Create a New Project:**

   - Create a new project.

3. **Get URL and API Key:**

   - Go to the Project Settings > API.
   - Copy your `Project URL` and `API Key`.

4. **Add to .env File:**
   - Create a `.env` file in the root directory and add the following lines:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_KEY=
```

### Database Schema

1. **Create tables and columns from `Table Editor`**

   - Create new table called `notes` <br/>
   - Create columns: `id - int8, PRIMARY, is identity` `body, colors, position | type - text` <br/>
   - Get default value for `colors` from `src/assets/colors.json`, or below from SQL query
   - default value for `position` {"x":100,"y":100}

2. **Or**

   - Navigate to the SQL editor and run the following SQL query to create the `notes` table:

   ```sql
   CREATE TABLE notes (
       id serial PRIMARY KEY,
       body text NULL,
       colors text NOT NULL DEFAULT '{
       "id": "color-orange",
       "colorHeader": "#F4A261",
       "colorBody": "#F7B383",
       "colorText": "#18181A"
   }',
       position text NOT NULL DEFAULT '{"x":100,"y":100}'
   );
   ```

**Auth policies**

- Enable RLS <br/>
- Create a policy with the following settings for `SELECT, INSERT, UPDATE, DELETE`, no need to select roles, expression: `true`

## Running the Project
 ```bash
 npm run dev
 ```