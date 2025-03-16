

Upload zip file with the following content:
orders.csv
```
../../../../../../../tmp/evil.sh
```

Extract zip files common code:
```java
File destinationDir = new File("/tmp/zip");
Enumeration<? extends ZipEntry> entries = zip.entries();
while (entries.hasMoreElements()) {
  ZipEntry e = entries.nextElement();
  File f = new File(destinationDir, e.getName());
  InputStream is = zip.getInputStream(e);
  IOUtils.copy(is, write(f));
}
```