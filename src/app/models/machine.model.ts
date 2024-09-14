export interface MachineRequest {
    name: string;
    type: string;
    acquisitionDate: Date; 
    status: string;
    lastMaintenance: Date | null;
    usefulLife: number;
    photo: string;
    userId: number;
}

export interface MachineResponse {
    id: number;
    name: string;
    type: string;
    acquisitionDate: Date; 
    status: string;
    lastMaintenance: Date | null;
    usefulLife: number;
    photo: string;
    userId: number;
}

export interface MachineRequestToUpdate {
    id: number;
    name: string;
    type: string;
    acquisitionDate: Date; 
    status: string;
    lastMaintenance: Date | null;
    usefulLife: number;
    photo: string;
    userId: number;
}