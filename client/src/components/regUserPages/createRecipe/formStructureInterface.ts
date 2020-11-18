export interface Ingredient {
    ingredient: string;
    amount: number;
    measure: string;
}

export interface FormStructureInterface {
    title: string;
    category: string;
    amount: number;
    summary: string;
    advice: string;
    instructions: string[];
    ingredients: Ingredient[];
    time: string;
}
