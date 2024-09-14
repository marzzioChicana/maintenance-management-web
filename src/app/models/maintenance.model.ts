export interface MaintenanceRequest {
    date: Date;
    cost: number;
    description: string;
    quantity: number;
    machineId: number;
    sparePartId: number;
}

export interface MaintenanceResponse {
    id: number;
    date: Date;
    cost: number;
    description: string;
    quantity: number;
    machine: any;
    sparePart: any;
}