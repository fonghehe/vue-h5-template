import 'pinia';

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    persist?:
      | boolean
      | {
          key?: string;
          storage?: Storage;
          pick?: string[];
          omit?: string[];
          debug?: boolean;
          serializer?: {
            serialize: (value: any) => string;
            deserialize: (value: string) => any;
          };
        };
  }
}
