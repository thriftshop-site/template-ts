require('dotenv').config()
const { API_KEY, SITE_URL, API_SECRET, SITE_DOMAIN } = process.env;

if (!API_KEY)
  throw new Error("SET API KEY");
 
if (!API_SECRET)
  throw new Error("SET BUX SECRET KEY");

if (!SITE_DOMAIN)
throw new Error("SET SITE DOMAIN");

if (!SITE_URL)
  throw new Error("SET SITE URL");
 
export { API_KEY, SITE_URL, API_SECRET, SITE_DOMAIN };

