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