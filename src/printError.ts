// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const isError = (e: any): e is Error => e instanceof Error;

export const printError = (e: Error) =>
  isZodError(e) ? printZodError(e) : `${e}`;

type ZodError = {
  issues: { path: string[]; message: string }[];
};

const isZodError = (e: any): e is ZodError => {
  return e && typeof e === "object" && Array.isArray(e.issues);
};

const printZodError = (e: ZodError): string =>
  e.issues
    .slice(0, 8)
    .map(
      ({ path, message }) =>
        `[${path
          .map((v) => (typeof v === "number" ? "[" + v + "]" : v))
          .join(".")}] ${message}`,
    )
    .join("; ");
