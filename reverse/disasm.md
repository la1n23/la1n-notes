
objdump -M intel -d helloWorld


objdump -M intel --no-show-raw-insn --no-addresses -d helloWorld


objdump -sj .data helloWorld
-s dumps strings
-j shows data sectio