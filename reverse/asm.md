Cheatsheet: [[Intro_To_Assembly_Language_Module_Cheat_Sheet.pdf]]
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

## Procedures
`call` - push the next instruction pointer `rip` to the stack, then jumps to the specified procedure
`ret` - pop the address at `rsp` into `rip`, then jump to it

Example:
```nasm
global _start
section .text
_start:
	call fnName
	mov rax, 60
	mov rdi, 0
	syscall
fnName:
	...
	...
	ret
```
## Functions
There are four main things we need to consider before calling a function:
1. Save registers on stack (Caller saved)
2. Pass Function Arguments (like syscalls)
3. Fix Stack Alignment
4. Get Function's Return Value (in rax)

When we call a function, we need to consider:
1. Saving Callee Saved registers (rbx and rbp)
2. Get arguments from registers
3. Align the Stack
4. Return value in rax

#### Using External Functions
Before we can use a function from libc (e.g. printf), we must import it first and then specify the libc library for dynamic linking when linking our code with ld.

#### Importing libc Functions
```nasm
global _start
extern printf
```

##### Function arguments
```bash
man -s 3 printf
...
   int printf(const char *format, ...);
```

```nasm
global _start
extern printf

section .data
	message db "Fibbonacci sequence:", 0x0a
	outFormat db "%d", 0x0a, 0x00
```

`0x00` is string termination, we must end any string with it
```nasm
printFib:
	push rax
	push rbx
	
	mov rdi, outFormat ; set 1st argument (print format)
	mov rsi, rbx       ; set 2nd argument (Fib number)
	
	pop rbx 
	pop rax
	ret
```
##### Stack alignment
Whenever we want to make a call to a function, we must ensure that the Top Stack Pointer (rsp) is aligned to the 16-byte boundary from the `_start` function stack

1. Each procedure `call` adds an 8-byte address to the stack, which is then removed with `ret`
2. Each `push` adds 8-bytes to the stack as well

If we were in a case where we wanted to bring the boundary up to 16, we can subtract bytes from `rsp`, as follows:
```nasm
    sub rsp, 16
    call function
    add rsp, 16
```

This may be a bit confusing, but the critical thing to remember is that `we should have 16-bytes (or a multiple of 16) on top of the stack before making a call.` We can count the number of (un`pop`ed) `push` instructions and (un`ret`urned) `call` instructions, and we will get how many 8-bytes have been pushed to the stack.