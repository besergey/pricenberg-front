export type Category = {
  id: number;
  name: string;
  picture: string;
};

export enum ProductDescriptionType {
  Processor = 'Processor',
  Videocard = 'Videocard',
  HardDrive = 'HardDrive',
  SolidDrive = 'SolidDrive',
  MemoryKit = 'MemoryKit',
}

export type Product = {
  id: number;
  name: string;
  price: number;
  description_type: ProductDescriptionType;
  description: {
    additional_properties?: {
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
