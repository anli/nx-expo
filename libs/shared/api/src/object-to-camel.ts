// extracted from ts-case-convert
export type ToCamel<S extends string | number | symbol> = S extends string
  ? S extends `${infer Head}_${infer Tail}`
    ? `${ToCamel<Uncapitalize<Head>>}${Capitalize<ToCamel<Tail>>}`
    : S extends `${infer Head}-${infer Tail}`
    ? `${ToCamel<Uncapitalize<Head>>}${Capitalize<ToCamel<Tail>>}`
    : Uncapitalize<S>
  : never;
export type ObjectToCamel<T extends object | undefined | null> =
  T extends undefined
    ? undefined
    : T extends null
    ? null
    : T extends Array<infer ArrayType>
    ? ArrayType extends object
      ? Array<ObjectToCamel<ArrayType>>
      : Array<ArrayType>
    : T extends Uint8Array
    ? Uint8Array
    : T extends Date
    ? Date
    : {
        [K in keyof T as ToCamel<K>]: T[K] extends
          | Array<infer ArrayType>
          | undefined
          | null
          ? ArrayType extends object
            ? Array<ObjectToCamel<ArrayType>>
            : Array<ArrayType>
          : T[K] extends object | undefined | null
          ? ObjectToCamel<T[K]>
          : T[K];
      };
