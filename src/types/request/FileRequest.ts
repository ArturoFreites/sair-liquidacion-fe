export type FileRequest = {
    id: number;
    name: string;
    lastName: string;
    dni: string;
    cuit?: string;
    birthday?: Date;
    workstation?: string;
    cbu?: string;
    salaryFactor?: number;
    accountingFile?: string;
    settleCommissions?: boolean;
    socialReasonId: number;
    costCenterId: number;
    bankId: number;
    salary:number;
};
