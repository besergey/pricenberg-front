export type Category = {
  id: number;
  name: string;
  picture: string;
};

export type Product = {
  id: number;
  name: string;
  description: {
    properties?: {
      [key: string]: string;
    };
    [key: string]:
      | string
      | undefined
      | {
          [key: string]: string;
        };
  };
};

export type SearchResponse = {
  items: Product[];
  meta: {
    total: number;
    fields: string[];
  };
};
