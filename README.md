# RoomHub
RoomHub allows you to monitor a room's environment conditions.
It does this by reading log data from a contract.
Log data is sent to the contract from a Pebble device via an IoT server
Frontend analyses log data to see if room conditions are ok

## Project setup
* clone this repo and `cd` into it
* install all packages by running `yarn install`
* start the local blockhain copy by running `yarn start-blockchain`
* copy one of the private keys logged by hardhat
* open your browser and open the MetaMask extension
* switch to localhost 8545
* import the private key in the MetaMask extension
* open a separate terminal while the `start-blockchain` command is still running
* in this new terminal deploy the RoomHub contract by running `yarn deploy-contract:local`
* copy the "Contract address" output from the first terminal
* replace the contract address in `src/components/route-guards/RouteGuards.jsx`, line 11 (only if the addresses differ)

## Running the project
* start the frontend by running `yarn start`
* open localhost:3000 in a browser instance **with** Metamask installed
* you should get a MetaMask confirmation popup. If you get balance too low error,
* reject the confirmation and connect to the imported wallet in localhost 8545
* reload the page
* confirm the MetaMask popup (this registers the wallet to the contract)
* wait for at least 1 confirmation of this confirmation then refresh the page
* if there's an error with the confirmation
* * open the metamask settings and reset the account, then try again
* You can now interact with the dApp

## Add a room
* click on the add room button
* fill in the room name, submit, confirm the transaction, wait for confirmation, and reload

## Configure threshold
* select a room
* click on "Configure threshold levels" on upper right
* fill in the form, submit, and confirm the transaction
* observe that the threshold data is now being read from the contract

## Add a device
* select a room
* click on add a device on the right
* fill in the form, submit, and confirm the transaction
* observe that the device is now being read from the contract

### Remaining features
- Send logs to contract from IoT server
- Read logs from contract (currently hardcoded sample data)
- Clean up interactions
- Add error handling
- Deploy to testnet

### Extending this project
We could add new features to this project. i.e —

- Analyse log data in contract and take certain actions based on values
- - Payout funds if room conditions are within threshold after a given time
