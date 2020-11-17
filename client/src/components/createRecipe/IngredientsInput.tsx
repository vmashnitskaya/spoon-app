import React, { ChangeEvent, FunctionComponent } from 'react';
import { Chip, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { connect } from 'react-redux';
import { SelectOptions } from '../../redux/recipes/recipesInterfaces';
import recipesSelectors from '../../redux/recipes/recipesSelectors';
import { RootState } from '../../redux/rootReducer';
import { Ingredient } from './formStructureInterface';
import TextNumberFieldInput from './TextNumberFieldInput';
import SelectFieldInput from './SelectFieldInput';

const useStyles = makeStyles(() => ({
    controls: {
        display: 'flex',
    },
    controlIngredient: {
        flex: '2 1 55%',
        margin: '10px 10px 10px 0',
    },
    controlAmount: {
        flex: '1 1 15%',
        margin: '10px 10px 10px 0',
    },
    controlMeasure: {
        flex: '1 1 auto',
        margin: '10px 10px 10px 0',
    },
    chip: {
        margin: '10px 30px 10px 0',
        alignSelf: 'flex-end',
    },
}));

interface IngredientsInputProps {
    measures: SelectOptions[];
    el: Ingredient;
    index: number;
    handleIngredientChange: (ingredient: Ingredient, index: number) => void;
    handleDeleteIngredient: (index: number) => void;
}

const IngredientsInput: FunctionComponent<IngredientsInputProps> = ({
    measures,
    el,
    index,
    handleIngredientChange,
    handleDeleteIngredient,
}) => {
    const classes = useStyles();

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | { value: unknown }>,
        field: string
    ) => {
        const eventTargetValue = event.target.value;
        handleIngredientChange({ ...el, [field]: eventTargetValue }, index);
    };

    return (
        <div className={classes.controls}>
            <Chip label={index + 1} className={classes.chip} />
            <TextNumberFieldInput
                name="ingredient"
                label="Ingredient"
                type="text"
                required={false}
                value={el.ingredient}
                onInputChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'ingredient')}
                className={classes.controlIngredient}
            />
            <TextNumberFieldInput
                name="number"
                label="Amount"
                type="number"
                required={false}
                value={el.amount}
                onInputChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'amount')}
                className={classes.controlAmount}
            />
            <SelectFieldInput
                className={classes.controlMeasure}
                label="Measure"
                value={el.measure}
                required={false}
                handleChange={(e: ChangeEvent<{ value: unknown }>) => handleChange(e, 'measure')}
                options={measures}
            />
            <IconButton onClick={() => handleDeleteIngredient(index)}>
                <ClearIcon />
            </IconButton>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    measures: recipesSelectors.measures(state),
});

export default connect(mapStateToProps)(IngredientsInput);
