
import type { Concept } from "./Concept";
import type { File } from "./File";
import type { SettlementPeriod } from "./SettlementPeriod";

export interface Novelty {

    id: number;
    file:File;
    concept:Concept;
    settlementPeriod:SettlementPeriod;
    value:number;
    totalQuota:number;
    origin: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

}