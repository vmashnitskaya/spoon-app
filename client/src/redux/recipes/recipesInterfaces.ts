export interface SelectOptions {
    name: string;
    label: string;
    query?: string;
}

export interface InitialState {
    categories: SelectOptions[];
    measures: SelectOptions[];
}
