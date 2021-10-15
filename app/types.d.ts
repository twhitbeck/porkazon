export interface Cart {
  entries: Array<{
    id: string;
    count: number;
  }>;
}
