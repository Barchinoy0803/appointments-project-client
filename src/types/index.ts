export type MonthlyReportItem = {
    month: string;
    sales: number;
};

export type MostUsedService = {
    service: string;
    percent: number;
};

export interface DataType {
    key: string;
    name: string;
    phoneNumber: string;
    address: string;
    tags: string;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
}

export interface ModalType {
    id?: number;
    isOpen: boolean;
    type?: ACTIONS;
}

export enum ACTIONS {
    EDIT = "EDIT",
    DELETE = "DELETE",
    CREATE = "CREATE"
}

export type FieldType = {
    first_name: string;
    last_name: string;
    password: string;
    phone_number: string;
    role: string;
};