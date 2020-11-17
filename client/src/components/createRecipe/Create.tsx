import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import './Create.scss';
import { connect } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { FormStructureInterface, Ingredient } from './formStructureInterface';
import TextNumberFieldInput from './TextNumberFieldInput';
import SelectFieldInput from './SelectFieldInput';
import recipesSelectors from '../../redux/recipes/recipesSelectors';
import { RootState } from '../../redux/rootReducer';
import { SelectOptions } from '../../redux/recipes/recipesInterfaces';
import IngredientsInput from './IngredientsInput';

const initialIngredient = { amount: 0, ingredient: '', measure: 'gr' };

const formStructure: FormStructureInterface = {
    title: '',
    category: '',
    amount: 0,
    summary: '',
    advice: '',
    instructions: [''],
    ingredients: [{ ...initialIngredient }],
};

interface CreateProps {
    categoriesList: SelectOptions[];
}

const Create: FunctionComponent<CreateProps> = ({ categoriesList }) => {
    const [structure, setStructure] = useState<FormStructureInterface>(formStructure);

    const handleIngredientChange = (ingredient: Ingredient, index: number) => {
        setStructure((prevState) => {
            const newIngredients = [...prevState.ingredients];
            newIngredients[index] = ingredient;
            return { ...prevState, ingredients: newIngredients };
        });
    };

    const handleIngredientAdd = () => {
        setStructure((prevState) => ({
            ...prevState,
            ingredients: [...prevState.ingredients, { ...initialIngredient }],
        }));
    };

    const handleDeleteIngredient = (index: number) => {
        setStructure((prevState) => {
            const newIngredients = [...prevState.ingredients];
            newIngredients.splice(index, 1);
            return { ...prevState, ingredients: newIngredients };
        });
    };

    const onInputChange = (
        e: ChangeEvent<HTMLInputElement | { value: unknown }>,
        field: string
    ) => {
        const newValue = e.target.value;
        setStructure((prevState) => ({ ...prevState, [field]: newValue }));
    };

    return (
        <form>
            <TextNumberFieldInput
                name="title"
                label="Title"
                type="text"
                required
                onInputChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e, 'title')}
                value={structure.title}
            />

            <SelectFieldInput
                name="category"
                label="Category"
                required
                options={categoriesList}
                handleChange={(e: ChangeEvent<{ value: unknown }>) => onInputChange(e, 'category')}
                value={structure.category ? structure.category : ''}
            />

            <TextNumberFieldInput
                name="amount"
                label="Amount"
                type="number"
                required
                onInputChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e, 'amount')}
                value={structure.amount}
            />

            <TextNumberFieldInput
                name="summary"
                label="Summary"
                type="textarea"
                required
                onInputChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e, 'summary')}
                value={structure.summary}
            />

            <TextNumberFieldInput
                name="advice"
                label="Advice"
                type="textarea"
                required={false}
                onInputChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e, 'advice')}
                value={structure.advice}
            />

            <Typography variant="subtitle1" display="block" color="primary" align="center">
                INGREDIENTS
            </Typography>

            <div className="ingredients">
                <div className="list">
                    {structure.ingredients.map((el, index) => (
                        <IngredientsInput
                            key={`${index + 1}_${el.ingredient}`}
                            el={el}
                            index={index}
                            handleIngredientChange={handleIngredientChange}
                            handleDeleteIngredient={handleDeleteIngredient}
                        />
                    ))}
                </div>
                <Button color="primary" onClick={handleIngredientAdd}>
                    Add ingredient
                </Button>
            </div>
        </form>
    );
};

const mapSTateToProps = (state: RootState) => ({
    categoriesList: recipesSelectors.categories(state),
});

export default connect(mapSTateToProps)(Create);
