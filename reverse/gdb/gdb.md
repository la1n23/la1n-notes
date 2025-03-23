#draft

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




