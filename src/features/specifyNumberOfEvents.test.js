import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    //Scenario 1
    test('When the user has not specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        let AppComponent;
        let eventList;
        given('a user has not specified the number of events', () => {
            AppComponent = render(<App />);
        });


        when('the user views the events section', async () => {
            const AppDOM = AppComponent.container.firstChild;
            await waitFor(() => {
                eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
        });
        then(/^(\d+) events are shown by default$/, (arg0) => {
            expect(eventList.length).toEqual(32);
        });
    });
    // Scenario 2
    test('When the user specifies the number of events.', ({ given, when, then }) => {
        let AppComponent;
        let NumberOfEventsDOM;
        let numberOfEventsInput;
        given('a user has specified the number of events', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
        });

        when('the user views the events section', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
            numberOfEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');
            await user.type(numberOfEventsInput, '{backspace}{backspace}10');


        });

        then('the app displays exactly as many events as the user specified', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventList = within(AppDOM).queryAllByRole('listitem');
            expect(eventList.length).toEqual(10);
        });
    });
});
