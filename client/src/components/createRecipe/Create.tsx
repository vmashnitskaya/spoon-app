import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import './Create.scss';
import { connect } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { FormStructureInterface, Ingredient } from './formStructureInterface';
import TextNumberFieldInput from './TextNumberFieldInput';
import SelectFieldInput from './SelectFieldInput';
import { SelectOptions } from '../../redux/recipes/recipesInterfaces';
import InstructionsInput from './InstructionsInput';
import InputGroupWrapper from './InputGroupWrapper';
import recipesSelectors from '../../redux/recipes/recipesSelectors';
import { RootState } from '../../redux/rootReducer';
import IngredientsInput from './IngredientsInput';

const initialIngredient = { amount: 0, ingredient: '', measure: 'gr' };

const formStructure: FormStructureInterface = {
    title: '',
    category: '',
    amount: 0,
    summary: '',
    advice: '',
    time: ['0', 'min'],
    instructions: [''],
    ingredients: [{ ...initialIngredient }],
};

const useStyles = makeStyles(() => ({
    amount: {
        margin: '10px 10px 0 0',
    },
}));

interface CreateProps {
    categoriesList: SelectOptions[];
    timeUnits: SelectOptions[];
}

const Create: FunctionComponent<CreateProps> = ({ categoriesList, timeUnits }) => {
    const [structure, setStructure] = useState<FormStructureInterface>(formStructure);
    const classes = useStyles();

    const handleIngredientChange = (ingredient: Ingredient, index: number) => {
        setStructure((prevState) => {
            const newIngredients = [...prevState.ingredients];
            newIngredients[index] = ingredient;
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

    const onTimeInputChange = (e: ChangeEvent<HTMLInputElement | { value: unknown }>) => {
        const newValue = e.target.value as string;

        setStructure((prevState) => {
            const newArray = [...prevState.time];
            const index: number = newValue.match(/\d/) ? 0 : 1;
            newArray[index] = index === 0 ? newValue : newValue;
            return { ...prevState, time: newArray };
        });
    };

    const handleInstructionChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = e.target.value;
        setStructure((prevState) => {
            const newInstructions = [...structure.instructions];
            newInstructions[index] = newValue;
            return { ...prevState, instructions: newInstructions };
        });
    };

    const handleFieldAdd = (field: string) => {
        setStructure((prevState) => ({
            ...prevState,
            [field]:
                field === 'instructions'
                    ? [...prevState.instructions, '']
                    : [...prevState.ingredients, { ...initialIngredient }],
        }));
    };

    const handleFieldDelete = (index: number, field: string) => {
        setStructure((prevState) => {
            const newValue = [...prevState[field as 'ingredients' | 'instructions']];
            newValue.splice(index, 1);
            return { ...prevState, [field]: newValue };
        });
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

            <div className="amounts">
                <TextNumberFieldInput
                    className={classes.amount}
                    name="amount"
                    label="Amount"
                    type="number"
                    required
                    onInputChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e, 'amount')}
                    value={structure.amount}
                />
                <div className="time">
                    <TextNumberFieldInput
                        className={classes.amount}
                        name="time"
                        label="Time"
                        type="number"
                        required
                        onInputChange={(e: ChangeEvent<HTMLInputElement>) => onTimeInputChange(e)}
                        value={structure.time[0]}
                    />
                    <SelectFieldInput
                        className={classes.amount}
                        label=""
                        name="timeUnit"
                        required={false}
                        options={timeUnits}
                        handleChange={(e: ChangeEvent<{ value: unknown }>) => onTimeInputChange(e)}
                        value={structure.time[1] as string}
                    />
                </div>
            </div>

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

            <InputGroupWrapper
                handleAdd={handleFieldAdd}
                buttonLabel="Add ingredient"
                type="ingredients"
            >
                <>
                    {structure.ingredients.map((el, index) => (
                        <IngredientsInput
                            key={`${index + 1}_${el.ingredient}`}
                            el={el}
                            index={index}
                            handleIngredientChange={handleIngredientChange}
                            handleDelete={handleFieldDelete}
                        />
                    ))}
                </>
            </InputGroupWrapper>

            <InputGroupWrapper
                handleAdd={handleFieldAdd}
                buttonLabel="Add instruction"
                type="instructions"
            >
                <>
                    {structure.instructions.map((el, index) => (
                        <InstructionsInput
                            key={`${index + 1}_${el.slice(0, 10)}`}
                            el={el}
                            index={index}
                            handleInstructionChange={handleInstructionChange}
                            handleDelete={handleFieldDelete}
                        />
                    ))}
                </>
            </InputGroupWrapper>
        </form>
    );
};

const mapStateToProps = (state: RootState) => ({
    categoriesList: recipesSelectors.categories(state),
    timeUnits: recipesSelectors.timeUnits(state),
});

export default connect(mapStateToProps)(Create);
