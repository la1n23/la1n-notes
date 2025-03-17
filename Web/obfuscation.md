#encoding
##### Unicode escaping
```js
eval("\u0061lert(1)")
```
##### Hex escaping
```js
eval("\x61lert")
```
##### Octal escaping
```js
eval("\141lert(1)")
```
##### SQL
```sql
CHAR(83)+CHAR(69)+CHAR(76)+CHAR(69)+CHAR(67)+CHAR(84)
```
#### Decode UTF8 hex
https://codebeautify.org/hex-string-converter
#### XOR
https://strelitzia.net/wasXORdecoder/wasXORdecoder.html

#### Encode
```python
>>> char = 'A'
>>> unicode_escape = f"\\u{ord(char):04x}"
>>> print(unicode_escape)
\u0041

```