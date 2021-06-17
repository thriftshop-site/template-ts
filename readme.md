# Netlify Serverless Function Typescript Template

> Use With Thriftshop Site as a Serverless Function

## Requirements
- netlify-cli
- postman

## Development
- [ ] Clone this Repo

```sh
git clone https://github.com/thriftshop-site/template-ts 
cd  template-ts
```

- [ ] Edit ENV: `cp .env.example .env anad edit .env`

- [ ] Install Any NPM Dependencies type: `yarn`

- [ ] Run Local Server: `netlify dev`

- [ ] open postman and set url to `http://localhost:8888/api` method: ***POST***

- [ ] Add Raw JSON

> Edit this with your Request Payload

```json
{
    "id": 1234,
    "name": "Hugo Dusk"
    "description": "Serverless Lambda Functions",
}
```

- [ ] Click Send, Receive the Response

<details>
  <summary>Response JSON</summary>

> Add Your Json Response Here

```json
//
```
> Define Each Response Atrributes Here:

</details>

## 1 Click Install For Production

> Edit This with Your repolink

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/thriftshop-site/template-ts)

## Deploy on One Specific Site URL in Production

- Go to [Settings](https://app.netlify.com/sites/tss-test/settings/general)

> Edit `$function_name}.${domain}.com/api`

- Click Change Site Name `${function_name}.${yourdomain}.com`

## Production

> Edit `$function_name}.${domain}.com/api`

- make post request with Needed *payload* to `$function_name}.${domain}.com/api`

