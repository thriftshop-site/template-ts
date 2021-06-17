
import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { API_KEY, SITE_DOMAIN, SITE_URL } from "./env-check";
import { bodyInterface } from "./interface/body";

const handler: Handler = async (event:HandlerEvent, context:HandlerContext ) => {
    checkMethod(event);
    checkOriginRequest(event);
      
    try {
      const response = await fetch(setAPIURL(), setPayload(event));
      
      if (!response.ok) {
        // NOT res.status >= 200 && res.status < 300
        return { statusCode: response.status, body: response.statusText }
      }
      const data = await response.json()
  
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      }
    } catch (error) {
      // output to netlify function log
      console.log(error)
      return {
        statusCode: 500,
        // Could be a custom message or object i.e. JSON.stringify(err)
        body: JSON.stringify({ msg: error.message }),
      }
    }
}

// TODO: set your API URL ENDPOINT
function setAPIURL(): string{
  return `${SITE_URL}/open/checkout`;
}

function checkMethod(event:HandlerEvent){
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed!" }),
      headers: { Allow: "POST" },
    };
  }
}

function checkOriginRequest(event:HandlerEvent){
if (event.headers.host !== SITE_DOMAIN){
     return {
          statusCode: 403,
          body: JSON.stringify({ error: "Forbidden Access To Api" }),
          headers: { Allow: "POST" },
        };
  }
}

function sanitizeParams(event:HandlerEvent): any{
  let params = null;

  try {
    params =  JSON.parse(event.body|| '{}');
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
  return params;
}

// TODO: Define All Parameters  You Need To Pass On Client Side
function setParams(event:HandlerEvent) {
 const params = sanitizeParams(event);
  const {
    name, 
    description, 
  } : 
  {
    description: string , 
    name: string
  } = params;

  if (!name||!description) {
    let error = {
      statusCode: 422,
      body: `Validation Error: **name** : ${name}, **description**: ${description}`,
    };
    return error;
  }
  return params;
}
// TODO: Set All Payload in bodyInterface
function setPayload(event:HandlerEvent){
  const {name,description} = setParams(event);
  
  const body: bodyInterface = {
    "id": uuidv4(),
    "description": description,
    "name": name,
  };

  const payload = {
    headers: { 
      Accept: 'application/json', 
      'x-api-key': `${API_KEY}` 
    },
    method: 'POST',
    body: JSON.stringify(body)
  };
  return payload;
}

export { handler };
