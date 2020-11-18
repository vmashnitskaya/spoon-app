export interface SelectOptions {
    name: string;
    label: string;
    query?: string;
}

export interface Ingredient {
    ingredient: string;
    amount: number;
    measure: string;
}

export interface Recipe {
    title: string;
    category: string;
    amount: number;
    summary: string;
    advice: string;
    time: string;
    instructions: string[];
    ingredients: Ingredient[];
    created_at: Date;
    author: string;
    approved: boolean;
}

export interface InitialState {
    categories: SelectOptions[];
    measures: SelectOptions[];
    timeUnits: SelectOptions[];
    loading: boolean;
    error: string;
    infoMessage: string;
    recipes: Recipe[];
}
