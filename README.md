# Base85
Base85 (Ascii85 with Adobe-Escape) encode or decode standard input, to standard output.

## Usage
### CLI
**⚠️ Binary input/output is not supported.**  
- Use Deno
  ```bash
  $ deno install --force -n base85 https://github.com/redpeacock78/base85/raw/v0.0.5/cli.ts
  $ base85 -V
  ```
- Download Binary
  ```bash
  # Linux_x86
  $ curl -sL https://github.com/redpeacock78/base85/releases/download/v0.0.5/base85-linux-x86 -o /usr/local/bin/base85
  $ chmod +x /usr/local/bin/base85
  $ base85 -V
  ```
- Encode
  ```console
  $ echo "Dream Theater" | base85
  <~6uljID'2ekART[lEXD~>
  $ base85 <<<"Ascii85は、7ビットの印字可能なASCII文字を使用した符号化方式です。Base85とも呼ばれます。"
  <~6$$OMBfJ!1JZn*aJN)VAPN.:Jj+E0JJZe*oYiW!Rjc?V/K>$;rW^0QN8P/'1LZPY)j+<HT]t``pW8iGqj+3icXJY*?\)iR7k*ER>]T;*(VrN>rj+)_J@<6!>2<07dj+;mEOhB_*YiC=oj+4r)JXPPKJdM~>
  ```
- Decode
  ```console
  $ cat test.txt
  <~6$$OMBfJ!1JZn*aJO3ddAN2R-JZ.U\K'0&9j+3KUJrJ`?JP]ctC`l/!;K[)'ATHg^X5eefj+<0QQAapo]&S@,j+<6MJY1tTOQ1qgj+E6LK<!saLZ=$"j+>&+Js,8^LZPY)jbT8`JZIn.M<9kgj+3WYJrAcJMrq@2j+4Ao\:Eb@Y2b)2j+2gBJrAZ>Ji)M?OQ1qgj+E0JJZe$cOQ1qgj+E6LK<!saLZ=$"j+>&+Js,;uVWElJjc#McJX87VQA=S(QfEY"5uU-B8`PE/j+G#)K8JW?P38(.j+2mDJYqRqLZPY)j+<HXTr@"&RHB?ak-L?5JZ%OZK&_H@j+3i_Jq;s4J`DBEj+=)eK8S]AWoJ_ej+G#)K"p>tP!O/!Bk]Oaj+4,lTr@"&RH:*KjcG;YJZn*dLZ=$"j+>&1Q+,e)N&<7Fj+48mU6ju!T]:Tkj+<3LJ:cg6LZ=$"j+>&1Q+,e)N&31Dj+48kJZ@a^Mfj/RDI[TqA`JAq6=FqH2DjHFX6-UMj+4c&MRho1LZb+Zj+4,gJV)p6MrT>>kE!@<];+D;VrN?3jLDh^JZD(IDdm;<JZ_gfF*(>jEbTK7j+;q\DfTr.@VfTu6uQRXD.RU,+@^9iD..PHK9bJKU#Ua#j+FDoL5"Z=Vrs;Cj+2mDJr/N>N8oJdj+2mDJrAZ>JdM~>
  $ cat test.txt | base85 -d
  Ascii85は、Base85とも称され、Paul E.Rutterにより開発されたバイナリデータを文字列に変換する手法の一種である。4バイトのバイナリデータを符号化し5文字のASCIIコードを用いて文字を表す手法であるため、バイナリデータをAscii85で表す場合はデータ長が5/4に増加する。データ長が4/3になるuuencodeやBase64に比べ効率的である。現代では主にAdobeのPostScriptやPortable Document Formatファイル内で用いられている。
  ```
### Deno module
**⚠️ Binary input is not supported.**
```typescript
import { base85encode, base85decode } from "https://github.com/redpeacock78/base85/raw/v0.0.5/mod.ts";

console.log(base85encode("Hello World."));
await Deno.stdout.write(base85decode('<~87cURD]i,"Ebo8=zz~>'));
```

## Contribution
Please Create [Issues](https://github.com/redpeacock78/base85/issues/new), or Pull Requests.

## License
This source code is licensed [MIT](https://github.com/redpeacock78/base85/blob/master/LICENSE).