// deno-lint-ignore-file camelcase no-inferrable-types
// Base85 Encode
export function base85encode(input: Uint8Array): string {
  const bit: string = [...input].map((u: number): string => Number(u).toString(2).padStart(8, "0")).join("");
  const n: number = 32;
  const mod: number = bit.length % n;
  let padding_bit: string = bit;
  if (mod !== 0) {
    for (let i: number = 0; i < n - mod; i++) {
      padding_bit = `${padding_bit}00`;
    }
  }
  const base: number[][] = padding_bit.match(/.{32}/g)!.map((i: string): number[] => {
    const con: number = 85;
    const dec: number = parseInt(i, 2);
    const a: number = dec % con;
    const b: number = ((dec - a) / con) % con;
    const c: number = ((dec - (a + b * con)) / con ** 2) % con;
    const d: number = ((dec - (a + b * con + c * con ** 2)) / con ** 3) % con;
    const e: number = ((dec - (a + b * con + c * con ** 2 + d * con ** 3)) / con ** 4) % con;
    return [e, d, c, b, a];
  });
  const result: string = base
    .flat()
    .map((i: number): string => String.fromCharCode(i + 33))
    .join("")
    .replace(/!!!!!/g, "z")
    .replace(/z+$/, "");
  return `<~${result}~>`;
}

// Base85 Decode
export function base85decode(str: string): Uint8Array {
  if (str.match(/^<~/) || str.match(/~>$/)) {
    const replaced: string = str.replace(/^<~/g, "").replace(/~>$/g, "").replace(/z/g, "!!!!!");
    const n: number = 5;
    const mod: number = replaced.length % n;
    const diff: number = n - mod;
    let replaced_arr: string[];
    if (mod === 0) {
      replaced_arr = replaced.match(/.{5}/g)!;
    } else {
      let padd_replaced: string = replaced;
      for (let i: number = 0; i < diff; i++) {
        padd_replaced = `${padd_replaced}u`;
      }
      replaced_arr = padd_replaced.match(/.{5}/g)!;
    }
    const ascii_arr: number[] = replaced_arr
      .map((i: string): number[] => {
        return i
          .match(/./g)!
          .map((i: string, n: number): number => (i!.charCodeAt(0) - 33) * 85 ** (4 - n))
          .reduce((sum: number, elm: number): number => sum + elm + 0)
          .toString(2)
          .padStart(32, "0")
          .match(/.{8}/g)!
          .map((i: string): number => parseInt(i, 2));
      })
      .flat();
    if (mod !== 0) {
      for (let i: number = 0; i < diff; i++) {
        ascii_arr.pop();
      }
    }
    return new Uint8Array(ascii_arr);
  } else {
    throw new Error("base86: invalid input");
  }
}
