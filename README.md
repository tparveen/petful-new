# Petful

## _Please use `yarn` instead of `npm`_

### In root directory run:

### `yarn install`

and it will install all necessary dependencies for server and client. In the root directory we're installing `npm-run-all` in order to run both sides from a single terminal instance:

## `yarn run dev`

This starts the server (which queues up the Queue) as well as the client (which opens the default browser).

On landing page just click the button to visit the Adoptions in Progress.

On the Dashboard component we can see the queue and it stops once it comes across an animal without an assigned adopter. That's our cue to click the respective button, which also sends a request to server to continue dequeuing.  

For illustration and educative purposes, each node that is dequeued gets re-enqueued.

The queues will never deplete. 

## Deployed

The client is deployed at:  
https://petful.tyxou.now.sh

_or directly in queues:_  
https://petful.tyxou.now.sh/dashboard

While the server is served from:  
https://server-petful.herokuapp.com/api

Server uses `CORS` and direct requests are not allowed. 
