## Setup
You will need to make your own `.env` file in the root directory with:

```
DISCORD_TOKEN=YOUR_TOKEN_HERE
```

## Execution
```
yarn install
yarn start
```

## Debugging
When running locally, you can set a different command to be called using the `.env`:

```
COMMAND=y
```

You can also add this snippet to open the webpage to be queried (on OSX):

```
require('child_process').exec(`open ${generatedUrl}`);
```
