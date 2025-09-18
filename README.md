# Meetecho Recordings Playout Application

Player for Meetecho recordings, which integrate video from meeting sessions (via YouTube), chat logs, transcripts, polls.

---
## Build the app

In the project directory, you can run:
#### `npm install`

Install dependencies.


##### `npm start`

Runs the app in the development mode.
The page will reload if you make edits.
You will also see any lint errors in the console.

##### `npm run build`

Builds the app for production to the directory specified in `vite.config.js` (`playout` by default).
The build is minified and the filenames include the hashes.
Your app is ready to be deployed, just copy it under your webserver!

---
## Configuration

The application configuration is specified in `src/config.json`: 
```
{
  "sessions_folder": "sessions",
  "transcripts_folder": "transcripts",
  "polls_folder": "polls"
}
```
wihch specifies the subdirectories that need to be available:

- `sessions_folder` -- contains JSON files that describe the session, e.g.,
```
{
  "title": "IETF112-DISPATCH-20211108-1200",
  "filename": "IETF112-DISPATCH-20211108-1200",
  "start": 0,
  "end": 2960000,
  "start_datetime": "2021-11-08T12:00:00Z",
  "videos": [
    {
      "type": 2, 				// 1 = video hosted on the local file system; 2 = video hosted on YouTube; 3 = video hosted on CloudFlare Stream
      "src": "Vk2n08pnrXs"		// file path | YouTube video id | CloudFlare Stream video id
    }
  ],
  "messages": [					// chat messages
    {
      "author": "John Doe",
      "text": "<p><a href=\"https://www.ietf.org/\">This is the IETF website</a></p>",
      "topic": "ietf112",
      "dtime": 109000			// display time [ms]
    },
    {
      "author": "Jane Doe",
      "text": "<p>Cool!</p>",
      "topic": "ietf112",
      "dtime": 1750000
    }
  ],
  "panels": [					// panels displayed as tabs at the bottom of the page
    {
      "type": 0,				
      "title": "Transcript"
    },
    {
      "type": 1,
      "title": "Datatracker",
      "link": "https://datatracker.ietf.org/meeting/112/session/dispatch"
    },
    {
      "type": 3,
      "title": "Show of hands"
    }
  ]
}
```

- `transcripts_folder` -- contains the transcripts that will be displayed in the related panel.

- `polls_folder` -- contains the polls data that will be displayed in the related panel.

We suggest that you create symlinks to these subdirectories in order to avoid overriding their content when deploying updates. 

#### Panels Types

- Type 0 -- Transcripts -- a tab with the transcripts will be displayed. The application will look for a JSON file with the same name as the `session` query parameter, within the `transcripts_folder` set in `config.json`
- Type 1 -- Iframe -- an iframe to an external location will be embedded in a tab
- Type 2 -- **DEPRECATED** Description -- text description with date information to be displayed in a tab. 
- Type 3 -- Polls -- a tab with the poll results will be displayed. The application will look for a JSON file with the same name as the `session` query parameter, within the `polls_folder` set in `config.json`

---
## Application structure

### SASS Architecture

- `index.sass` -- This is the file that contains all the resets, "normalizations" and global styles. It is a mixture of normalize.css and reset.css from Bootstrap.

- `app.sass` -- This is the CSS file that is mainly concerned with the Layout of the application.

- `ComponentName.sass` -- Every component have its own sass file imported on top to ensure the maximum reusability.


---
## Run the app
Once you built the app, you can just copy the output directory under your webserver.
The application takes a `session` query parameter that is used to fetch JSON data.
The application will look into the subdirectories set in `config.json` for JSON files that have to be named as the `session` query parameter used.

Example: `https://example.com/playout/?session=IETF112-DISPATCH-20211108-1200`. 
The application will try to fetch the following JSON files:

- `sessions/IETF112-DISPATCH-20211108-1200`

- `transcripts/IETF112-DISPATCH-20211108-1200`

- `polls/IETF112-DISPATCH-20211108-1200`


---
## Cloudflare Worker
Cloudflare woker soruce sits under `worker` directory.

To run locally (from `worker/`):
```
npx wrangler dev
```

To deploy the cloudflare worker:
```
npx wrangler deploy
```
