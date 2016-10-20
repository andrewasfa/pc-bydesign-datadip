Data Dip for SAP Business ByDesign (to be used by PureCloud Bridge Action)
============================


*Business by Design* - SOAP based Web services:
http://help.sap.com/saphelp_byd1608/en/PUBLISHING/IntegrationServices.html

*PureCloud* - At least Communicate is required to build the IVR.

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


------------
```

-----------------
