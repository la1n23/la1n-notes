```bash
# show interfaces
tshark -D

# specify interface
tshark -i 2
tshark -i eth0
tshark -i eth0 -f "host 172.134.23.13"

```
Capture filters

|       **Capture Filters**       | **Result**                                                                                                           |
| :-----------------------------: | -------------------------------------------------------------------------------------------------------------------- |
|          host x.x.x.x           | Capture only traffic pertaining to a certain host                                                                    |
|         net x.x.x.x/24          | Capture traffic to or from a specific network (using slash notation to specify the mask)                             |
|     src/dst net x.x.x.x/24      | Using src or dst net will only capture traffic sourcing from the specified network or destined to the target network |
|             port #              | will filter out all traffic except the port you specify                                                              |
|           not port #            | will capture everything except the port specified                                                                    |
|          port # and #           | AND will concatenate your specified ports                                                                            |
|          portrange x-x          | portrange will grab traffic from all ports within the range only                                                     |
|        ip / ether / tcp         | These filters will only grab traffic from specified protocol headers.                                                |
| broadcast / multicast / unicast | Grabs a specific type of traffic. one to one, one to many, or one to all.<br>                                        |
Display filters

|                            |                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| ip.addr == x.x.x.x         | Capture only traffic pertaining to a certain host. This is an OR statement.                   |
| ip.addr == x.x.x.x/24      | Capture traffic pertaining to a specific network. This is an OR statement.                    |
| ip.src/dst == x.x.x.x      | Capture traffic to or from a specific host                                                    |
| dns / tcp / ftp / arp / ip | filter traffic by a specific protocol. There are many more options.                           |
| tcp.port == x              | filter by a specific tcp port.                                                                |
| tcp.port / udp.port != x   | will capture everything except the port specified                                             |
| and / or / not<br>         | AND will concatenate, OR will find either of two options, NOT will exclude your input option. |

TCP streams
- right-click on a packet from the stream we wish to recreate.
- select follow → TCP
- this will open a new window with the stream stitched back together. From here, we can see the entire conversation
- 

Extracting Data and Files From a Capture
To extract files from a stream:
	- stop your capture.
- Select the File radial → Export → , then select the protocol format to extract from.
- (DICOM, HTTP, SMB, etc.)

FTP
ftp.request.command
ftp-data

# Add TLS key
go to Edit → Preferences → Protocols → TLS
On the TLS page, select Edit by RSA keys list → a new window will open. 
#### Import An RDP Key
1. Click the + to add a new key
2. Type in the IP address of the RDP server 10.129.43.29
3. Type in the port used 3389
4. Protocol filed equals tpkt or blank.
5. Browse to the server.key file and add it in the key file section.
6. Save and refresh your pcap file.