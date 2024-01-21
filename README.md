# Karaoke system for home usage

### (microphones, amps, speakers, and cables not included)

## Required

Add the webaddress where you'll be deploying the app to `.env` (`REACT_APP_SITE_URL` is the key)
You'll need to get at least one [API key for YouTube](https://developers.google.com/youtube/v3) in order for the search feature to work

Long story short, there is a limit of 100 searchers/day per project

Here's how to add an API key:

1. Create a project in your [Google Console](https://console.cloud.google.com/projectcreate)
2. Enable `YouTube Data API v3` in the [Google Console API Library](https://console.cloud.google.com/apis/library)
3. `+ CREATE CREDENTIALS` in [Google Console APIs & Services](https://console.cloud.google.com/apis/credentials)
4. You may want to restrict this key as well to only be used for `YouTube Data API v3` (you can do so by clicking on the newly created key then selecting `Restrict Key` at the bottom under `API restrictions` - search for `youtube` in the dropdown menu and select `YouTube Data API v3`)
5. Add the key to your local `.env` (or wherever you plan to deploy this`with a key of`ACT_APP_GOOGLE_API_KEY_1` (increase the number for each additional API key you add)

If 100 searches/day is not enough for you, repeat steps 1 through 5

## Start the app

To get it up and running:

1. Navigate to `./api` then run `yarn server`
2. Open another temrinal and navigate to `./web` then run `yarn start`

You can also run the API in a container (make sure you first have [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed):

1. Navigate to `./api` then run `docker compose up -d` (or `docker compose up` if you want to leave the logging open)

## Start singing!

On whatever screen/compouter/console you plan to display the lyrics, you'll need to navigate to wherever you set `REACT_APP_SITE_URL` and add `/#/lyrics` to that path. Ex: `https://www.karaokesite.com/#/lyrics`.

Everyone else can navigate to the root page. Ex: `https://www.karaokesite.com/`

## TODO

- [ ]
