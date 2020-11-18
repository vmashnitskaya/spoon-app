import React, { ChangeEvent, FunctionComponent } from 'react';
import { Chip, IconButton } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ClearIcon from '@material-ui/icons/Clear';
import TextNumberFieldInput from './TextNumberFieldInput';

interface InstructionsInputProps {
    el: string;
    index: number;
    handleInstructionChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
    handleDelete: (index: number, field: string) => void;
}
const useStyles = makeStyles(() => ({
    chip: {
        margin: '10px 30px 10px 0',
        alignSelf: 'flex-end',
    },
    controls: {
        display: 'flex',
        width: '100%',
    },
    instruction: {
        flex: '3 1 400px',
    },
}));

const InstructionsInput: FunctionComponent<InstructionsInputProps> = ({
    el,
    index,
    handleInstructionChange,
    handleDelete,
}) => {
    const classes = useStyles();
    return (
        <div className={classes.controls}>
            <Chip label={index + 1} className={classes.chip} />
            <TextNumberFieldInput
                key={`instruction${index}`}
                name={`instruction${index}`}
                label="Instruction"
                type="text"
                required={false}
                onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInstructionChange(e, index)
                }
                value={el}
                className={classes.instruction}
            />

            <IconButton onClick={() => handleDelete(index, 'instructions')}>
                <ClearIcon />
            </IconButton>
        </div>
    );
};

export default InstructionsInput;
