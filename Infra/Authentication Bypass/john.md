#### Single crack mode
```shell
john --format=des hashes_to_crack.txt
```
#### Wordlist Mode
```shell
john --wordlist=<wordlist_file> --rules <hash_file>
```
#### Incremental Mode
Generates wrdlist on fly
```shell
john --incremental <hash_file>
```
#### Cracking Files with John
```shell
<tool> <file_to_crack> > file.hash
pdf2john server_doc.pdf > server_doc.hash
john server_doc.hash
# OR
john --wordlist=<wordlist.txt> server_doc.hash 
```
#### List of supported files:
```shell
locate *2john*
```
