# Nike SNKRS monitor

This is a Nike SNKRS monitor.

## How to use

- Run `npm install`. Make sure that you have npm installed before doing this, you can download it for free with Node.JS (which is also necessary).
- Run `npm run build`. This builds the files and outputs it in the `dist` folder.
- Place your webhooks in files named `webhooks_countrycode.txt`. These will all go in the `dist` folder. A list of valid countrycodes is shown below.
- Place your proxies in a file named `proxies.txt`. This is also in the `dist` folder.
- To run the monitor for a region, run `snkrs_countrycode.js`. This will be in the `dist` folder. Tools like `pm2` can be used to keep this process alive forever, or at least until it is stopped or the computer turns off.

## Advanced config

To change how often a monitor checks for restocks, you have 2 options:
- Edit the `dist/snkrs-countrycode.js` file directly - this is faster, and does not require rebuilding, but note that your changes will be overridden in the next build
- Edit the `src/snkrs-countrycode.ts` file - this requires you to run `npm run build` again, but your changes will be saved.

If you are editing the source file, the line on which the interval is is on line 16. If you are editing the compiled file, the line will be line 36.

Note that the interval is in milliseconds (e.g. 5000 milliseconds is 5 seconds)

## Valid countrycodes

- us - United States of America
- gb - United Kingdom (Great Britain)
- au - Australia
- ca - Canada
- fr - France
- jp - Japan
- cn - China