import { getStdin } from "https://deno.land/x/get_stdin@v1.1.0/mod.ts";
import { Command } from "https://deno.land/x/cliffy@v0.20.1/command/mod.ts";
import { base85encode, base85decode } from "./mod.ts";

try {
  let stdin: string;
  let filled: boolean;
  const isatty: boolean = Deno.isatty(Deno.stdin.rid);
  if (!isatty) {
    stdin = await getStdin({ exitOnEnter: false });
    filled = stdin ? true : false;
  }
  const { options, args } = await new Command()
    .name("base85")
    .description("** Binary input/output is not supported. **\nBase85 (Ascii85 with Adobe-Escape) encode or decode standard input, to standard output.")
    .version("0.0.4")
    .option("-d, --decode", "decode data")
    .arguments("<option>")
    .parse(isatty ? Deno.args : [...Deno.args, stdin!]);
  const { decode } = options;
  const runner = decode ? base85decode : base85encode;
  const result: string | Uint8Array = runner(String(args[0]));
  if (filled!) {
    typeof result === "string" ? console.log(result) : await Deno.stdout.write(result);
  } else if (!isatty && filled!) {
    typeof result === "string" ? console.log(result) : await Deno.stdout.write(result);
  } else {
    throw new Error("base85: No such file or directory");
  }
} catch (e) {
  console.error(e.message);
  Deno.exit(1);
}
