# Base85
Base85 (Adobe) encode or decode standard input, to standard output.

## Usage
### CLI
- Use Deno
  ```bash
  $ deno install --force https://github.com/redpeaock78/base85/raw/v0.0.1/cli.ts
  $ base85 -V
  ```
- Download Binary
  ```bash
  # Linux_x86
  $ curl -sL https://github.com/redpeaock78/base85/releases/download/v0.0.1/base85-linux-x86 -o /usr/local/bin/base85
  $ base85 -V
  ```
### Deno module
```typescript
import { base85encode, base85decode } from "https://github.com/redpeaock78/base85/raw/v0.0.1/mod.ts";

console.log(base85encode("Hello World."));
console.log(base85decode('<~87cURD]i,"Ebo8=zz~>'));
```

## Contribution
Please Create [Issues](https://github.com/redpeacock78/base85/issues/new), or Pull Requests.

## License
This source code is licensed [MIT](https://github.com/redpeacock78/base85/blob/master/LICENCE).