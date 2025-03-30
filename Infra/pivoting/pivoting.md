# Ping sweep
Its recommended to perform ping sweep twice.
```
meterpreter > run post/multi/gather/ping_sweep RHOSTS=172.16.5.0/23

# or bash
for i in {1..254} ;do (ping -c 1 172.16.5.$i | grep "bytes from" &) ;done

# or cmd
for /L %i in (1 1 254) do ping 172.16.5.%i -n 1 -w 100 | find "Reply"

# or powershell
1..254 | % {"172.16.5.$($_): $(Test-Connection -count 1 -comp 172.15.5.$($_) -quiet)"}
```