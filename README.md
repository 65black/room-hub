# Running RoomHub

To run a local copy of RoomHub, follow these steps —

* clone this repo and `cd` into it
* install all packages by running `yarn install`
* start the local blockhain copy by running `yarn start-blockchain`
* deploy the RoomHub contract by running `yarn deploy-contract:local`
* copy the contract address output from the command line
* replace the contract address in `src/components/route-guards/RouteGuards.jsx`, line 11
* start the frontend by running `yarn start`
* open localhost:3000 in a browser instance **with** Metamask installed
