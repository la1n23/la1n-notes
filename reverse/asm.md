
Registers

Instruction Pointer (Program Counter) - IP - 16bit
Extended Instruction Pointer - EIP - 32bit
Register Instruction Pointer - RIP - 64bit


EAX / RAX - accumulator
EBX / RBX - base - referencing an offset
ECX / RCX - loop counter
EDX / RDX - multiplication/division
ESP / RSP - stack pointer
ESI / RSI - source index register, string operations
EDI / RDI - destination index register, string operaations
R8-R15 - general purpose for 64bit, R8D - 32bit, R8W - 16bit, R8B - 8bit

status flags
EFLAGS - 32b, RFLAGS - 64bit

ZF - indicates when the result of the last executed instruction was zero
CF - Carry flag - Denoted by CF, the Carry Flag indicates when the last executed instruction resulted in a number too big or too small for the destination.
SF - Sign flag - The Sign Flag or SF indicates if the result of an operation is negative or the most significant bit is set to 1
TF - Trap Flag - deebug flag


`mov destination, source`
`mov eax, [0x5fc53e]` - memory ref

The lea instruction stands for "load effective address." The format of this instruction is as follows:
`lea eax, [ebp+4]`

`shr destination, count  
`shl destination, count`

`ror destination, count  
`rol destination, count`

![[asm flags.png]]



`test destination, source`
sets ZF


Based on the result, the CMP instruction compares the two operands and sets the Zero Flag (ZF) or the Carry Flag (CF). It has the following syntax:  
`cmp destination, source`

