#draft
Plugin for gdb that makes everything better:

```bash
bash -c "$(curl -fsSL https://gef.blah.cat/sh)"
```

###### Some commands:
```
help info
```

```
info functions
```

```
info variables
```

###### Run debugger
```
gdb -q ./elf
```

##### Breakpoints
```
b _start
```

```
r
```

If we want to set a breakpoint at a certain address, like _start+10, we can either b *_start+10 or b *0x40100a:`

The * tells GDB to break at the instruction stored in 0x40100a.
###### Continue after stop
```
continue
```
or
```
c
```

###### Examine
To manually examine any of the addresses or registers or examine any other, we can use the x command in the format of x/FMT ADDRESS,

Count 	The number of times we want to repeat the examine 	2, 3, 10
Format 	The format we want the result to be represented in 	x(hex), s(string), i(instruction)
Size 	The size of memory we want to examine 	b(byte), h(halfword), w(word), g(giant, 8 bytes)

```
gef➤  x/4ig $rip

=> 0x401000 <_start>:	mov    eax,0x1
   0x401005 <_start+5>:	mov    edi,0x1
   0x40100a <_start+10>:	movabs rsi,0x402000
   0x401014 <_start+20>:	mov    edx,0x12
   ```

##### Addresses
```
gef➤  x/wx 0x401000

0x401000 <_start>:	0x000001b8
```
Show all register values:
```
gef➤  registers
$rax   : 0x0               
$rbx   : 0x0               
$rcx   : 0x0               
$rdx   : 0x0               
$rsp   : 0x00007fffffffe310  →  0x0000000000000001
$rbp   : 0x0               
$rsi   : 0x0               
$rdi   : 0x0               
$rip   : 0x0000000000401000  →  <_start+0> mov eax, 0x1
...SNIP...
```

### Step
Go to next:
instruction
```
gef➤  si
0x0000000000401005 in _start ()
   0x400fff                  add    BYTE PTR [rax+0x1], bh
 →   0x401005 <_start+5>       mov    edi, 0x1
     0x40100a <_start+10>      movabs rsi, 0x402000
     0x401014 <_start+20>      mov    edx, 0x12
     0x401019 <_start+25>      syscall 
─────────────────────────────────────────────────────────────────────────────────────── threads ────
     [#0] Id 1, Name: "helloWorld", stopped 0x401005 in _start (), reason: SINGLE STEP
```
Count
Move next N stops:
```
gef➤  si 3
0x0000000000401019 in _start ()
─────────────────────────────────────────────────────────────────────────────────── code:x86:64 ────
     0x401004 <_start+4>       add    BYTE PTR [rdi+0x1], bh
     0x40100a <_start+10>      movabs rsi, 0x402000
     0x401014 <_start+20>      mov    edx, 0x12
 →   0x401019 <_start+25>      syscall 
     0x40101b <_start+27>      mov    eax, 0x3c
     0x401020 <_start+32>      mov    edi, 0x0
     0x401025 <_start+37>      syscall 
─────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "helloWorld", stopped 0x401019 in _start (), reason: SINGLE STEP
```

### Modifidcation

#### Addresses
To modify values in GDB, we can use the set command. However, we will utilize the patch command in GEF to make this step much easier. Let's enter help patch in GDB to get its help menu:
```
gef➤  break *0x401019

Breakpoint 1 at 0x401019
gef➤  r
gef➤  patch string 0x402000 "Patched!\\x0a"
gef➤  c

Continuing.
Patched!
 Academy!
 ````
#### Registers
```
gef➤  break *0x401019

Breakpoint 1 at 0x401019
gef➤  r
gef➤  patch string 0x402000 "Patched!\\x0a"
gef➤  set $rdx=0x9
gef➤  c

Continuing.
Patched!
```

Show register value in decimal:
```
p/d $rbx
```


You can use the command `attach <PID>` to attach to some other already running program. You can use the command
`core <PATH>` to analyze the coredump of an already run program.

When starting or running a program, you can specify arguments in almost exactly the same way as you would on your shell.
For example, you can use `start <ARGV1> <ARGV2> <ARGVN> < <STDIN_PATH>`.

Use the command `continue`, or `c` for short, in order to continue program execution.

```
set disassembly-flavor intel
```

```
info registries

# register in dec
p $rdi

# register in hex
p/x $rdi
```

address
```
x/<n><u><f> <address>
<u> unit size - b (1 byte), h (2 bytes), w (4 bytes), g (8 bytes)
<f> format    - d, x, s (string), i (instruction)
<n> number of elements to display
<address> - register, address or exparrions like $rbp-0x32 
```
print all instructions
```
disas main
```

```
stepi or si <n> - step forward one instruction
nexti or ni <n> - stpe forward and step over function calls
finish          - finish current function
break *address  - breakpoint
continue        - run until hits breakpoint

display/<n><u><f> - display at all the times
display/8i $rip
display/4gx $rsp  - first 4 value of stacks
layout regs       - TUI mode
```

scripting
```bash
# load scripts on first load
gdb -X script.gdb file.elf

# initial script
cat ~/.gdbinit
set disassembly-flavor intel
```
scripts examples
```gdb
start
break *main+42
commands
  x/gx $rbp-0x32
  continue
end
continue
```

```gdb
start
break *main+42
commands
  silent
  set $local_variable = *(unsigned long long*)($rbp-0x32)
  printf "Current value: %llx\n", $local_variable
  continue
end
continue
```
```
set $count = 0
while $count < 10
	x/16gx $rbp-0x18
	continue
set $count = $count = 1
```
You can modify the state of your target program with the set command. For example, you can use set $rdi = 0 to zero out $rdi. You can use set *((uint64_t *) $rsp) = 0x1234 to set the first value on the stack to 0x1234. You can use set *((uint16_t *) 0x31337000) = 0x1337 to set 2 bytes at 0x31337000 to 0x1337.
```gdb
start
catch syscall read
commands
  silent
  if ($rdi == 42)
    set $rdi = 0
  end
  continue
end
continue
```




