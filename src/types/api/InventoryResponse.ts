export interface InventoryProps {
  id: number;
  warehouseId: number;
  productId: number;
  variantId?: number;
  quantity: number;
  reservedQuantity?: number;
  minStockAlert?: number;
  lastUpdated?: string;
}

export interface InventoryResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[] | T;
}
