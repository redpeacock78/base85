import { readLines } from "https://deno.land/std@0.101.0/io/mod.ts";
import { Command } from "https://deno.land/x/cliffy@v0.20.1/command/mod.ts";
import { base85encode, base85decode } from "./mod.ts";

try {
  let judge: boolean;
  const stdin: string[] = [];
  const isatty: boolean = Deno.isatty(Deno.stdin.rid);
  if (!isatty) {
    for await (const line of readLines(Deno.stdin)) {
      judge = typeof readLines(Deno.stdin) === "object" ? true : false;
      stdin.push(line);
    }
  }
  const { options, args } = await new Command()
    .name("base85")
    .description("Base85 (Adobe) encode or decode standard input, to standard output.")
    .version("0.0.2")
    .option("-d, --decode", "decode data")
    .arguments("<option>")
    .parse(isatty ? Deno.args : [...Deno.args, stdin.join("\n")]);
  const { decode } = options;
  const runner = decode ? base85decode : base85encode;
  if (judge!) {
    console.log(runner(String(args[0])));
  } else if (!isatty && judge!) {
    console.log(runner(String(args[0])));
  } else {
    throw new Error("base85: No such file or directory");
  }
} catch (e) {
  console.error(e.message);
  Deno.exit(1);
}
