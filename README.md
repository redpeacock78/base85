# Base85
Base85 (Ascii85 with Adobe Escape Sequence) encode or decode FILE, or standard input, to standard output.

## Usage
### CLI

**ð It can now also handle binaries!**  
- Use Deno ð¦
  ```bash
  $ deno install -A -f -n base85 https://denopkg.com/redpeacock78/base85@latest/cli.ts
  $ base85 -V
  ```
- Download Binary ð¦
  ```bash
  # Linux_x86(Latest)
  # When you want to specify a version
  # https://ghrl.tk/redpeacock78/base85[@tag]/base85-linux-x86
  $ curl -sL https://ghrl.tk/redpeacock78/base85/base85-linux-x86 -o /usr/local/bin/base85
  $ chmod +x /usr/local/bin/base85
  $ base85 -V
  ```
- Encode
  ```console
  $ echo "Dream Theater" | base85
  <~6uljID'2ekART[lEXD~>
  $ base85 <<<"Ascii85ã¯ã7ãããã®å°å­å¯è½ãªASCIIæå­ãä½¿ç¨ããç¬¦å·åæ¹å¼ã§ããBase85ã¨ãå¼ã°ãã¾ãã"
  <~6$$OMBfJ!1JZn*aJN)VAPN.:Jj+E0JJZe*oYiW!Rjc?V/K>$;rW^0QN8P/'1LZPY)j+<HT]t``pW8iGqj+3icXJY*?\)iR7k*ER>]T;*(VrN>rj+)_J@<6!>2<07dj+;mEOhB_*YiC=oj+4r)JXPPKJdM~>
  ```
- Decode
  ```console
  $ cat test.txt
  <~6$$OMBfJ!1JZn*aJO3ddAN2R-JZ.U\K'0&9j+3KUJrJ`?JP]ctC`l/!;K[)'ATHg^X5eefj+<0QQAapo]&S@,j+<6MJY1tTOQ1qgj+E6LK<!saLZ=$"j+>&+Js,8^LZPY)jbT8`JZIn.M<9kgj+3WYJrAcJMrq@2j+4Ao\:Eb@Y2b)2j+2gBJrAZ>Ji)M?OQ1qgj+E0JJZe$cOQ1qgj+E6LK<!saLZ=$"j+>&+Js,;uVWElJjc#McJX87VQA=S(QfEY"5uU-B8`PE/j+G#)K8JW?P38(.j+2mDJYqRqLZPY)j+<HXTr@"&RHB?ak-L?5JZ%OZK&_H@j+3i_Jq;s4J`DBEj+=)eK8S]AWoJ_ej+G#)K"p>tP!O/!Bk]Oaj+4,lTr@"&RH:*KjcG;YJZn*dLZ=$"j+>&1Q+,e)N&<7Fj+48mU6ju!T]:Tkj+<3LJ:cg6LZ=$"j+>&1Q+,e)N&31Dj+48kJZ@a^Mfj/RDI[TqA`JAq6=FqH2DjHFX6-UMj+4c&MRho1LZb+Zj+4,gJV)p6MrT>>kE!@<];+D;VrN?3jLDh^JZD(IDdm;<JZ_gfF*(>jEbTK7j+;q\DfTr.@VfTu6uQRXD.RU,+@^9iD..PHK9bJKU#Ua#j+FDoL5"Z=Vrs;Cj+2mDJr/N>N8oJdj+2mDJrAZ>JdM~>
  $ cat test.txt | base85 -d
  Ascii85ã¯ãBase85ã¨ãç§°ãããPaul E.Rutterã«ããéçºããããã¤ããªãã¼ã¿ãæå­åã«å¤æããææ³ã®ä¸ç¨®ã§ããã4ãã¤ãã®ãã¤ããªãã¼ã¿ãç¬¦å·åã5æå­ã®ASCIIã³ã¼ããç¨ãã¦æå­ãè¡¨ãææ³ã§ããããããã¤ããªãã¼ã¿ãAscii85ã§è¡¨ãå ´åã¯ãã¼ã¿é·ã5/4ã«å¢å ããããã¼ã¿é·ã4/3ã«ãªãuuencodeãBase64ã«æ¯ã¹å¹ççã§ãããç¾ä»£ã§ã¯ä¸»ã«Adobeã®PostScriptãPortable Document Formatãã¡ã¤ã«åã§ç¨ãããã¦ããã
  ```
### Deno module
```typescript
import { base85encode, base85decode } from "https://denopkg.com/redpeacock78/base85@latest/mod.ts";

console.log(base85encode(new TextEncoder().encode("Hello World.")));
Deno.stdout.writeSync(base85decode('<~87cURD]i,"Ebo8=zz~>'));
```

## Contribution
Please Create [Issues](https://github.com/redpeacock78/base85/issues/new), or Pull Requests.

## License
This source code is licensed [MIT](https://github.com/redpeacock78/base85/blob/master/LICENSE).