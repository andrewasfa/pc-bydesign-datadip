Data Dip for SAP Business ByDesign (to be used by PureCloud Bridge Action)
============================


*Business by Design* - SOAP based Web services:
http://help.sap.com/saphelp_byd1608/en/PUBLISHING/IntegrationServices.html


```
        _
      _(  )
    _(   ) )_
 __(   (     )____                                    this part
(PureCloud org____)                                      |
      \                                                  |
      +--------------------------------+                 |
      |         Bridge server |        |                \|/
      |------------------------------+-|     +------------------+   +----+
      | Web services data dip action]| |-----| PureDip ByDesign |---| SAP|
      +--------------------------------+  |  +------------------+ | +----+
                                          |                       |
                                         ReST                    SOAP

```
-----------
# Requirements
## Installation requirements
- server running **NodeJS** and **npm**

## Other components
- SAP Business byDesign - https://help.sap.com/byd-en
- PureCloud org (Engage) - https://www.inin.com/unified-collaboration
- Bridge Server - https://help.mypurecloud.com/articles/bridge-platform/
  * Bridge action (Web Services Data Dip) - https://help.mypurecloud.com/articles/add-bridge-actions-web-services-data-dip-connector/

# Setup instructions
## Install this web service
1. Download and uncompress the package (or clone)
2. Install the  dependencies `npm install`
3. Navigate to the root directory and run the service `node .`

*Note: for production environment, you may want to use PM2 (http://pm2.keymetrics.io/)  as a process manager for this NodeJS application to allow for automated start, logging and restart of the process if it crashes. Here is a good intro to setting up PM2: https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps 


## Setup PureCloud
1. Install the Bridge Server - https://help.mypurecloud.com/articles/install-bridge-server/ .
2. Create the Web Service Data Dip action hosted on the Bridge server from step 1. \
In the configuration point it to the server running the integration service (*./extra/ConnectorConfig.png*)
3. Create an IVR call flow (consult example *./extra/SAP_lookup.i3InboundFlow*).
4. Create an Agent script to receive the Account info (string) from the above IVR.
  * Add an action to the script to open the URL (consult *./extra/AgentScript_Action.png*).
  * More info about screen pops in PureCloud: https://help.mypurecloud.com/articles/advanced-lesson-create-a-screen-pop-script-and-add-it-to-a-call-flow/.
5. Create a queue and add the agent to the queue.


## Setup SAP
You may need to contact your SAP administrator to perform the following steps.

1. Create new **Communication System**.
2. Create new **Communication Scenario** - **Get Business partner data**.
3. Create new **Communication Arrangement**, create new *credentials*.
4. Download the WSDL for the Accounts and save it in the ./server directory under *accounts.wsdl* name.

Screen pop in SAP: http://scn.sap.com/docs/DOC-69501



-----------------
