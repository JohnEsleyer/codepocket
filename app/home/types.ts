export interface Collection {
    id: number;
    title: string;
}

export interface Snippet {
    id: number;
    title: string;
    collection_id: number;
    code: string;
    language: string;
    description: string;
}
