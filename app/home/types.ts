export interface Collection {
    id: number;
    title: string;
    shared: boolean;
}

export interface Snippet {
    id: number;
    title: string;
    collection_id: number;
    code: string;
    language: string;
    description: string;
}

export interface Link{
    id: string;
    accessibility: string;
    collection_id: number;
    owner_username: string;
}