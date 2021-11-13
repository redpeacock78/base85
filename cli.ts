import { readAllSync } from "https://deno.land/std@0.114.0/streams/conversion.ts";
import { getStdinBufferSync } from "https://deno.land/x/get_stdin@v1.1.0/mod.ts";
import { Command } from "https://deno.land/x/cliffy@v0.20.1/command/mod.ts";
import { base85encode, base85decode } from "./mod.ts";

try {
  let file: Uint8Array;
  let stdin: Uint8Array;
  let filled: boolean;
  let args_judge: boolean;
  const isatty: boolean = Deno.isatty(Deno.stdin.rid);
  if (!isatty) {
    const input = getStdinBufferSync({ exitOnEnter: false });
    if (input.length !== 0) {
      stdin = input;
      filled = stdin.length! !== 0 ? true : false;
    } else if (!Deno.args[0].match(/-d|--decode|-h|--help|-V|--version/)) {
      try {
        args_judge = true;
        stdin = readAllSync(Deno.openSync(Deno.args[0]));
        Deno.close(Deno.openSync(Deno.args[0]).rid);
        filled = stdin.length !== 0 ? true : false;
      } catch {
        throw new Error("base85: No such file or directory");
      }
    } else if (Deno.args[1]) {
      try {
        args_judge = false;
        stdin = readAllSync(Deno.openSync(Deno.args[1]));
        Deno.close(Deno.openSync(Deno.args[1]).rid);
        filled = stdin.length !== 0 ? true : false;
      } catch {
        throw new Error("base85: No such file or directory");
      }
    }
  } else if (Deno.args[0] !== undefined) {
    args_judge = Deno.args[0].match(/-d|--decode|-h|--help|-V|--version/) ? true : false;
    if (!args_judge) {
      try {
        file = readAllSync(Deno.openSync(Deno.args[0]));
        Deno.close(Deno.openSync(Deno.args[0]).rid);
        filled = file.length !== 0 ? true : false;
      } catch {
        throw new Error("base85: No such file or directory");
      }
    } else if (Deno.args[1]) {
      try {
        file = readAllSync(Deno.openSync(Deno.args[1]));
        Deno.close(Deno.openSync(Deno.args[1]).rid);
        filled = file.length !== 0 ? true : false;
      } catch {
        throw new Error("base85: No such file or directory");
      }
    }
  }
  const { options, args } = await new Command()
    .name("base85")
    .description("Base85 (Ascii85 with Adobe Escape Sequence) encode or decode FILE, or standard input, to standard output.")
    .version("v0.0.12")
    .option("-d, --decode", "Decode data")
    .arguments("<option>")
    .parse(!isatty ? (args_judge! ? [[...stdin!].join(",")] : [Deno.args[0], [...stdin!].join(",")].filter(Boolean)) : !file! ? Deno.args : !args_judge! ? [[...file!].join(",")] : [Deno.args[0], [...file!].join(",")]);
  const { decode } = options;
  const runner: ((str: string) => Uint8Array) | ((byte: Uint8Array) => string) = decode ? base85decode : base85encode;
  const convert: () => void = (): void => {
    const args2Unit8Array: Uint8Array = new Uint8Array(args[0].split(","));
    const input: Uint8Array | string = decode ? new TextDecoder().decode(args2Unit8Array).replace(/\n$/g, "") : args2Unit8Array;
    const result: string | Uint8Array = runner(input! as Uint8Array & string);
    typeof result === "string" ? console.log(result) : Deno.stdout.writeSync(result);
  };
  if (filled!) {
    convert();
  } else if (!isatty && filled!) {
    convert();
  } else if (file! && filled!) {
    convert();
  } else {
    throw new Error("base85: No such file or directory");
  }
} catch (e) {
  console.error(e.message);
  Deno.exit(1);
}
