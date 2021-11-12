import { getStdinBufferSync } from "https://deno.land/x/get_stdin@v1.1.0/mod.ts";
import { Command } from "https://deno.land/x/cliffy@v0.20.1/command/mod.ts";
import { base85encode, base85decode } from "./mod.ts";

try {
  let stdin: Uint8Array;
  let filled: boolean;
  const isatty: boolean = Deno.isatty(Deno.stdin.rid);
  if (!isatty) {
    stdin = getStdinBufferSync({ exitOnEnter: false });
    filled = stdin.length !== 0 ? true : false;
  }
  const { options, args } = await new Command()
    .name("base85")
    .description("Base85 (Ascii85 with Adobe Escape Sequence) encode or decode FILE, or standard input, to standard output.")
    .version("0.0.7")
    .option("-d, --decode", "Decode data")
    .arguments("<option>")
    .parse(isatty ? Deno.args : [...Deno.args, [...stdin!].join(",")]);
  const { decode } = options;
  const runner: ((str: string) => Uint8Array) | ((byte: Uint8Array) => string) = decode ? base85decode : base85encode;
  const convert: () => void = (): void => {
    const args2Unit8Array: Uint8Array = new Uint8Array(args[0].split(","));
    const input: Uint8Array | string = !decode ? args2Unit8Array : new TextDecoder().decode(args2Unit8Array).replace(/\n$/g, "");
    const result: string | Uint8Array = runner(input! as Uint8Array & string);
    typeof result === "string" ? console.log(result) : Deno.stdout.writeSync(result);
  };
  if (filled!) {
    convert();
  } else if (!isatty && filled!) {
    convert();
  } else {
    throw new Error("base85: No such file or directory");
  }
} catch (e) {
  console.error(e.message);
  Deno.exit(1);
}
