import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import { render } from '@testing-library/react';

//TDD tests
describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(
            <NumberOfEvents setCurrentNOE={() => { }}
                setErrorAlert={() => { }}
            />
        );
    });

    test('contains element with role "textbox"', () => {
        const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberTextBox).toBeInTheDocument();
    });

    test('32 events are rendered as default', () => {
        const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberTextBox).toHaveValue('32');

    });

    test('update numberOfEvents when user types', async () => {
        const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
        const user = userEvent.setup();
        await user.type(numberTextBox, '{backspace}{backspace}10');
        expect(numberTextBox).toHaveValue('10');
    });

});

//Integration tests
