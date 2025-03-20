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