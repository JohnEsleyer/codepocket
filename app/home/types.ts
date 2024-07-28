export type Collection = {
    id: number;
    title: string;
    shared: boolean;
    workspace_id: number | undefined;
}

export type Snippet = {
    id: number;
    title: string;
    collection_id: number;
    code: string;
    language: string;
    description: string;
}

export type Link = {
    id: string;
    accessibility: string;
    collection_id: number;
    owner_username: string;
}

export type Workspace = {
    id: number,
    name: string,
    active: boolean,
};