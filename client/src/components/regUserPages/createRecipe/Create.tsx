import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import './Create.scss';
import { connect } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { AnyAction, Dispatch } from 'redux';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { FormStructureInterface, Ingredient } from './formStructureInterface';
import TextNumberFieldInput from './TextNumberFieldInput';
import SelectFieldInput from './SelectFieldInput';
import { Recipe, SelectOptions } from '../../../redux/recipes/recipesInterfaces';
import InstructionsInput from './InstructionsInput';
import InputGroupWrapper from './InputGroupWrapper';
import recipesSelectors from '../../../redux/recipes/recipesSelectors';
import { RootState } from '../../../redux/rootReducer';
import IngredientsInput from './IngredientsInput';
import recipesActions from '../../../redux/recipes/recipesActions';
import authSelectors from '../../../redux/auth/authSelectors';
import { UserData } from '../../../redux/auth/authInterfaces';
import Progress from '../../Progress';

const initialIngredient = { amount: 0, ingredient: '', measure: 'gr' };

const formStructure: FormStructureInterface = {
    title: '',
    category: '',
    amount: 0,
    summary: '',
    advice: '',
    time: '',
    instructions: [''],
    ingredients: [{ ...initialIngredient }],
};

const useStyles = makeStyles(() => ({
    amount: {
        margin: '10px 10px 0 0',
    },
    create: {
        marginTop: 40,
    },
}));

interface CreateProps {
    categoriesList: SelectOptions[];
    timeUnits: SelectOptions[];
    createRecipe: (recipe: Recipe) => void;
    userData: UserData;
    loading: boolean;
    error: string;
}

const Create: FunctionComponent<CreateProps> = ({
    categoriesList,
    timeUnits,
    createRecipe,
    userData,
    loading,
    error,
}) => {
    const [structure, setStructure] = useState<FormStructureInterface>(formStructure);
    const [time, setTime] = useState<string[]>(['0', 'min']);
    const classes = useStyles();
    const history = useHistory();

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

        setTime((prevState) => {
            const newArray = [...prevState];
            const index: number = newValue.match(/\d/) ? 0 : 1;
            newArray[index] = index === 0 ? newValue : newValue;
            return newArray;
        });
    };

    useEffect(() => {
        setStructure((prevState) => {
            return { ...prevState, time: time.join('') };
        });
    }, [time]);

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

    const handleCreateRecipe = async () => {
        const recipe = {
            ...structure,
            created_at: new Date(),
            author: `${userData.first_name} ${userData.last_name}`,
            approved: true,
        };
        await createRecipe(recipe);
        if (!loading && !error) {
            history.push('/myRecipes');
        }
    };

    return (
        <>
            {loading ? (
                <Progress />
            ) : (
                <form>
                    <TextNumberFieldInput
                        name="title"
                        label="Title"
                        type="text"
                        required
                        onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
                            onInputChange(e, 'title')
                        }
                        value={structure.title}
                    />

                    <SelectFieldInput
                        name="category"
                        label="Category"
                        required
                        options={categoriesList}
                        handleChange={(e: ChangeEvent<{ value: unknown }>) =>
                            onInputChange(e, 'category')
                        }
                        value={structure.category ? structure.category : ''}
                    />

                    <div className="amounts">
                        <TextNumberFieldInput
                            className={classes.amount}
                            name="amount"
                            label="Amount"
                            type="number"
                            required
                            onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
                                onInputChange(e, 'amount')
                            }
                            value={structure.amount}
                        />
                        <div className="time">
                            <TextNumberFieldInput
                                className={classes.amount}
                                name="time"
                                label="Time"
                                type="number"
                                required
                                onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    onTimeInputChange(e)
                                }
                                value={time[0]}
                            />
                            <SelectFieldInput
                                className={classes.amount}
                                label=""
                                name="timeUnit"
                                required={false}
                                options={timeUnits}
                                handleChange={(e: ChangeEvent<{ value: unknown }>) =>
                                    onTimeInputChange(e)
                                }
                                value={time[1] as string}
                            />
                        </div>
                    </div>

                    <TextNumberFieldInput
                        name="summary"
                        label="Summary"
                        type="textarea"
                        required
                        onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
                            onInputChange(e, 'summary')
                        }
                        value={structure.summary}
                    />

                    <TextNumberFieldInput
                        name="advice"
                        label="Advice"
                        type="textarea"
                        required={false}
                        onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
                            onInputChange(e, 'advice')
                        }
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
                                    key={`${index + 1}_${index + 1}`}
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
                                    key={`${index + 1}_${index + 1}`}
                                    el={el}
                                    index={index}
                                    handleInstructionChange={handleInstructionChange}
                                    handleDelete={handleFieldDelete}
                                />
                            ))}
                        </>
                    </InputGroupWrapper>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={handleCreateRecipe}
                        className={classes.create}
                    >
                        Create recipe
                    </Button>
                </form>
            )}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    categoriesList: recipesSelectors.categories(state),
    timeUnits: recipesSelectors.timeUnits(state),
    userData: authSelectors.userData(state),
    loading: recipesSelectors.loading(state),
    error: recipesSelectors.error(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    createRecipe: (recipe: Recipe) => dispatch(recipesActions.createRecipe(recipe)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
