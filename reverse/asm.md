# Common
**data registers**: rax, rbx, rcx, rdx, r8, r9, 10
**pointer register**s: rbp, rsp, rip

rbp - base stack pointer
rsp - current stack pointer
rip - instruction pointer

```nasm
mov eax, 42       ; Writes 42 to eax
mov ebx, eax      ; Copy value from  eax to ebx
mov ecx, [edx]    ; Copy value at edx address to ecx

lea eax, [ebx + ecx*4 + 10]  ; Compute address (EBX + ECX*4 + 10)  and writes it to eax
```

# Instructions

inc, dec
add
sub
imul
not
and
or
xor

### loops
```nasm
exampleLoop:
	instruction 1
	instruction 2
	loop exampleLoop
```
rcx - loop count, decreases each iteration

```nasm
mov rcx, 3
loop exampleLoop
```

##### complete example
```nasm
global start

section .text
_start:
	xor rax, rax  ; initialize rax to 0
	xor rbx, rbx  ; same
	inc rbx
	mov rcx, 10   ; loop counter
loopFib:
	add rax, rbx  ; rax=rax+rbx
	xchg rax, rbx ; swap values
	loop loopFib
```

##### Conditional branching
Example:
```nasm
_start:
	mov al, 10
	mov bl, 10
	cmp al, bl
	je equal
	jg greater
equal:
	...

greater:
	...
  ```


##### RFLAGS
- The Carry Flag `CF`: Indicates whether we have a float.
- The Parity Flag `PF`: Indicates whether a number is odd or even.
- The Zero Flag `ZF`: Indicates whether a number is zero.
- The Sign Flag `SF`: Indicates whether a register is negative.

##### JNZ loopFib
It's shorcut for: `dec rcx` and `jnz loopFib`
```nasm
global  _start

section .text
_start:
    xor rax, rax    ; initialize rax to 0
    xor rbx, rbx    ; initialize rbx to 0
    inc rbx         ; increment rbx to 1
    mov rcx, 10
loopFib:
    add rax, rbx    ; get the next number
    xchg rax, rbx   ; swap values
    dec rcx			; decrement rcx counter
    jnz loopFib		; jump to loopFib until rcx is 0
```

##### `cmp` instruction 

|   |   |   |
|---|---|---|
|`cmp`|Sets `RFLAGS` by subtracting second operand from first operand (i.e. first - second)|`cmp rax, rbx` -> `rax - rbx`|

## Stack

rsp - top stack poitner
rbp - base stack pointer

push rax - copy register to top 
pop rax - move from stack top to register

## Syscalls
```bash
man -s 2 write
...SNIP...
       ssize_t write(int fd, const void *buf, size_t count);
```

If manual is missing, try:
```bash
sudo apt install -y manpages-dev
```

Reference:
https://filippo.io/linux-syscall-table/

| Description                 | 64-bit Register | 8-bit Register |
| --------------------------- | --------------- | -------------- |
| Syscall Number/Return value | `rax`           | `al`           |
| Callee Saved                | `rbx`           | `bl`           |
| 1st arg                     | `rdi`           | `dil`          |
| 2nd arg                     | `rsi`           | `sil`          |
| 3rd arg                     | `rdx`           | `dl`           |
| 4th arg                     | `rcx`           | `cl`           |
| 5th arg                     | `r8`            | `r8b`          |
| 6th arg                     | `r9`            | `r9b`          |
Any additional arguments can be stored in the stack (though not many syscalls use more than `6` arguments.).
Note: `rax` is also used for storing the `return value` of a syscall or a function. So, if we were expecting to get a value back from a syscall/function, it will be in `rax`.