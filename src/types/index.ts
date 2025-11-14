export type MonthlyReportItem = {
    service_name: string;
    total_appointments: number;
};

export type MostUsedService = {
    service_id__name: string;
    total: number;
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

export interface Appointment {
    id: number;
    status: APPOINTMENT_STATUS;
    specialist: User;
    client: User;
    service: Service;
}

export interface Service {
    name: string;
    description: string;
    is_active: boolean;
    business: Business;
}

export interface Business {
    name: string;
    description: string;
    type: BUSINESS_TYPE;
    address: string;
    latitude: string;
    longitude: string;
    contact: string;
    opening_hours: string;
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

export enum ROLES {
    ADMIN = "admin",
    CLIENT = "client",
    SPECIALIST = "specialist"
}

export enum APPOINTMENT_STATUS {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    CANCELED = "canceled",
    MOVED = "moved "
}

export enum BUSINESS_TYPE {
    CLINIC = "clinic",
    BARBERSHOP = "barbershop",
    BEAUTY_SHOP = "beautyshop",
    SPORT = "sport"
}

export type FieldType = {
    first_name: string;
    last_name: string;
    password: string;
    phone_number: string;
    role: string;
};

export type ParamsType = {
    limit: number;
    offset: number
}