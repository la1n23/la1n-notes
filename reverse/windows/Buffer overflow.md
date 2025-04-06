1. Fuzzing Parameters
2. Controlling EIP
3. Identifying Bad Characters
4. Finding a Return Instruction
5. Jumping to Shellcode

# FUZZING
| **Field**           | **Example**                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| `Text Input Fields` | - Program's "license registration" field.  <br>- Various text fields found in the program's preferences. |
| `Opened Files`      | Any file that the program can open.                                                                      |
| `Program Arguments` | Various arguments accepted by the program during runtime.                                                |
| `Remote Resources`  | Any files or resources loaded by the program on run time or on a certain condition.<br>                  |
|                     |                                                                                                          |

```powershell
PS C:\Users\htb-student\Desktop> python -c "print('A'*10000)"

AAAAA...SNIP....AAAA

PS C:\Users\htb-student\Desktop> python -c "print('A'*10000, file=open('fuzz.wav', 'w'))"

```