export interface SparePartRequest {
    name: string;
    code: string;
    quantity: number;
    supplier: string;
    price: number;
    userId: number;
}

export interface SparePartResponse {
    id: number;
    name: string;
    code: string;
    quantity: number;
    supplier: string;
    price: number;
    user: any;
}