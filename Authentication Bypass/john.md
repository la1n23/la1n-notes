
Single crack mode
```shell
john --format=des hashes_to_crack.txt
```

#### Wordlist Mode

```shell-session
jabrach@htb[/htb]$ john --wordlist=<wordlist_file> --rules <hash_file>
```


#### Incremental Mode
Generates wodlist on fly

```shell-session
jabrach@htb[/htb]$ john --incremental <hash_file>
```


#### Cracking Files with John

```shell-session
cry0l1t3@htb:~$ <tool> <file_to_crack> > file.hash
cry0l1t3@htb:~$ pdf2john server_doc.pdf > server_doc.hash
cry0l1t3@htb:~$ john server_doc.hash
                # OR
cry0l1t3@htb:~$ john --wordlist=<wordlist.txt> server_doc.hash 
```

List of supported files:
```shell-session
jabrach@htb[/htb]$ locate *2john*
```




