# Linux disasm/decompiler
##### Installation
```bash
sudo dnf install radare2
# gui
flatpak install cutter  
```
You will be as which one to install, use
`app/re.rizin.cutter/x86_64/stable`

Install decompiler plugin:
```bash
flatpak install rz-ghidra
```

Run
```bash
flatpak run re.rizin.cutter
```

# objdump

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