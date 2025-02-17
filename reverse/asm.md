[[asm registers]]
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