import { assertEquals } from "https://deno.land/std@0.95.0/testing/asserts.ts";
import { base85decode, base85encode } from "./mod.ts";

Deno.test("Success Encode Function", (): void => {
  const str: Uint8Array = new TextEncoder().encode("Dream Theater");
  const encode: string = base85encode(str);
  assertEquals(encode, "<~6uljID'2ekART[lEW?(>~>");
});

Deno.test("Success Decode Function", (): void => {
  const str = '<~87cURD]i,"Ebo8=~>';
  const decode: string = new TextDecoder().decode(base85decode(str));
  assertEquals(decode, "Hello World.");
});

Deno.test("Faile Decode Function", (): void => {
  try {
    const str = '87cURD]i,"Ebo8=';
    base85decode(str);
  } catch (e) {
    assertEquals(e, Error("base86: invalid input"));
  }
});
