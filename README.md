Data Dip for SAP Business ByDesign (to be used by PureCloud Bridge Action)
============================


*Business by Design* - SOAP based Web services:
http://help.sap.com/saphelp_byd1608/en/PUBLISHING/IntegrationServices.html


------------
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
#Requirements

## Installation requirements
- server running **NodeJS** and **npm**

## Other components
- SAP Business byDesign - https://help.sap.com/byd-en
- PureCloud org (Engage) - https://www.inin.com/unified-collaboration
- Bridge Server - https://help.mypurecloud.com/articles/bridge-platform/
..* Bridge action (Web Services Data Dip) - https://help.mypurecloud.com/articles/add-bridge-actions-web-services-data-dip-connector/

# Install instructions
1. Download and uncompress the package (or clone)
2. Install the  dependencies `npm install`
3. Navigate to the root directory and run the service `node .`

-----------------
