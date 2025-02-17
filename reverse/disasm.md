```bash
objdump -M intel -d helloWorld
```

```bash
objdump -M intel --no-show-raw-insn --no-addresses -d helloWorld
```

```bash
objdump -sj .data helloWorld
```
Options:
 * -s dumps strings
* -j shows data section