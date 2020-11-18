import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import recipesSelectors from '../../redux/recipes/recipesSelectors';
import Alert from './Alert';

interface MyRecipesProps {
    infoMessage: string;
}

const MyRecipes: FunctionComponent<MyRecipesProps> = ({ infoMessage }) => {
    const history = useHistory();

    const handleCreateClick = () => {
        history.push('/create');
    };

    return (
        <>
            <Button size="small" variant="outlined" color="primary" onClick={handleCreateClick}>
                Create recipe
            </Button>
            {infoMessage && <Alert message={infoMessage} color="success" />}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    infoMessage: recipesSelectors.infoMessage(state),
});

export default connect(mapStateToProps)(MyRecipes);
