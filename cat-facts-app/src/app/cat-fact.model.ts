
export interface Status {
    verified: boolean;
    feedback: string;
    sentCount: number;
}

export interface CatFact {
    status: Status;
    _id: string;
    user: string;
    text: string;
    source: string;
    updatedAt: Date;
    type: string;
    createdAt: Date;
    deleted: boolean;
    used: boolean;
}
