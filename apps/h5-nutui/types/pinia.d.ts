import 'pinia';

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    persist?:
      | boolean
      | {
          debug?: boolean;
          key?: string;
          omit?: string[];
          pick?: string[];
          serializer?: {
            deserialize: (value: string) => any;
            serialize: (value: any) => string;
          };
          storage?: Storage;
        };
  }
}
