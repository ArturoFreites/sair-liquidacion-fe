import type { Bank } from "./Bank";
import type { CostCenter } from "./CostCenter";
import type { Person } from "./Person";
import type { SocialReason } from "./SocialReason";

export interface File {
    id: number;
    workstation: string;
    cbu: string;
    salaryFactor: number;
    accountingFile: string;
    settleCommissions: boolean;
    socialReason: SocialReason;
    costCenter: CostCenter;
    bank: Bank;
    person: Person;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    [key: string]: unknown;
}