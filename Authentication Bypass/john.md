
##### Single crack mode
```shell
john --format=des hashes_to_crack.txt
```

#### Wordlist Mode
```shell
john --wordlist=<wordlist_file> --rules <hash_file>
```


#### Incremental Mode
Generates wodlist on fly

```shell
john --incremental <hash_file>
```


#### Cracking Files with John

```shell
cry0l1t3@htb:~$ <tool> <file_to_crack> > file.hash
cry0l1t3@htb:~$ pdf2john server_doc.pdf > server_doc.hash
cry0l1t3@htb:~$ john server_doc.hash
                # OR
cry0l1t3@htb:~$ john --wordlist=<wordlist.txt> server_doc.hash 
```

List of supported files:
```shell
locate *2john*
```




