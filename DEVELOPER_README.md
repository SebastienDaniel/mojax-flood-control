**mojax-flood-control** prevents multiple identical requests from being made over a given period of time.

# Getting started
Add **mojax** and **mojax-flood-control** to your project:
`npm install mojax mojax-flood-control --save`

Require the two modules into your code, and create your mojax request instance:
```js
var mojax = require("mojax")(),
    floodControl = require("mojax-flood-control");

mojax.use(floodControl());
```

## How mojax uses middleware
Middleware are used to manipulate the request parameters **before** the actual HTTP request is started.

When you add middleware to a mojax instance, the middleware function gets added to an internal queue.
Every time you make a request, the request parameters you have provided are piped through each middleware.
Each middleware **must return the request parameters object** for the next middleware to be called. Not returning the request parameters object
(i.e. returning `null` or `undefined`) is how you can cancel a request.

The mojax request method respects the following flow:

1. make a request: `req(params);`
2. your request parameters are *piped* through each middleware
3. the middleware transform your request parameters
4. the final (*transformed*) request parameters are used to send the HTTP request
5. the HTTP request triggers callbacks, based on its progress

### How mojax-flood-control works
mojax-flood-control is a factory, each instance creates a middleware function that you can use with mojax.

The instance function scans and caches each request made, and verifies if an **identical** request has been made within the specified delay.
If so, it cancels the request, if not it allows the request to go through and register the request into its delay cache.

It is important to note that flood-control will consider a request for the delay period, even if that request is not successful.

--------
## Modules

<dl>
<dt><a href="#module_mojax-flood-control">mojax-flood-control</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#canQuery">canQuery(key, delay)</a> ⇒ <code>boolean</code> ℗</dt>
<dd></dd>
<dt><a href="#compileDelays">compileDelays(delays)</a> ⇒ <code>Object</code> ℗</dt>
<dd></dd>
<dt><a href="#continueRequest">continueRequest(controllers, delays, params)</a> ⇒ <code>boolean</code> ℗</dt>
<dd></dd>
<dt><a href="#mojax-flood-control">mojax-flood-control(delays)</a> ⇒ <code>function</code></dt>
<dd></dd>
</dl>

<a name="module_mojax-flood-control"></a>

## mojax-flood-control
**Summary**: prevents duplicate requests from being sent in rapid succession  
<a name="canQuery"></a>

## canQuery(key, delay) ⇒ <code>boolean</code> ℗
**Kind**: global function  
**Summary**: Tests a query with the cached time of it's last request.  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | unique id of the request |
| delay | <code>number</code> | delay to test against, in milliseconds |

<a name="compileDelays"></a>

## compileDelays(delays) ⇒ <code>Object</code> ℗
**Kind**: global function  
**Summary**: compiles the final delay values based on those provided,
falling back to the default delays  
**Access:** private  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| delays | <code>object</code> |  | delays to apply based on request type |
| [delays.GET] | <code>number</code> | <code>250</code> | get request delay in milliseconds |
| [delays.POST] | <code>number</code> | <code>250</code> | POST request delay in milliseconds |
| [delays.PUT] | <code>number</code> | <code>250</code> | PUT request delay in milliseconds |
| [delays.DELETE] | <code>number</code> | <code>Infinity</code> | DELETE request delay in milliseconds |

<a name="continueRequest"></a>

## continueRequest(controllers, delays, params) ⇒ <code>boolean</code> ℗
**Kind**: global function  
**Summary**: Tests against the floodControllers dictionary if the query should go through, or not.  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| controllers | <code>object</code> | map of Dictionaries that store past requests and their times |
| delays | <code>object</code> | floodControl delay values |
| params | <code>object</code> | request params to test against |

<a name="mojax-flood-control"></a>

## mojax-flood-control(delays) ⇒ <code>function</code>
**Kind**: global function  
**Summary**: compiles the parts to create a flood controller function  
**Returns**: <code>function</code> - allowQuery test function, based on past requests  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| delays | <code>object</code> | the delays, in milliseconds, for GET, POST, PUT, DELETE operations |

