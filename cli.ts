import { getStdin } from "https://deno.land/x/get_stdin@v1.1.0/mod.ts";
import { Command } from "https://deno.land/x/cliffy@v0.20.1/command/mod.ts";
import { base85encode, base85decode } from "./mod.ts";

try {
  const stdin: string[] = [];
  const isatty: boolean = Deno.isatty(Deno.stdin.rid);
  if (!isatty) {
    const get: string = await getStdin({ exitOnEnter: false });
    stdin.push(get);
  }
  const { options, args } = await new Command()
    .name("base85")
    .description("Base85 (Adobe) encode or decode standard input, to standard output.")
    .version("0.0.3")
    .option("-d, --decode", "decode data")
    .arguments("<option>")
    .parse(isatty ? Deno.args : [...Deno.args, ...stdin]);
  const { decode } = options;
  const runner = decode ? base85decode : base85encode;
  if (!isatty) {
    const result: string | Uint8Array = runner(String(args[0]));
    if (typeof result === "string") {
      console.log(result);
    } else {
      await Deno.stdout.write(result);
    }
  } else {
    throw new Error("base85: No such file or directory");
  }
} catch (e) {
  console.error(e.message);
  Deno.exit(1);
}
