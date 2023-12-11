export type User = {
    id: string,
    email: string,
    name?: string | null,
    createdAt: Date,
    updatedAt: Date,
    Tenant?: Tenant | null,
    tenantId?: string | null,
}

export type Tenant = {
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    users: Array<User>;
}