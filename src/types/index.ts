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
