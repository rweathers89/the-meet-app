import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
    //Scenario 1
    test('An event element is collapsed by default.', ({ given, when, then }) => {
        let AppComponent;
        given('the main page is open', () => {
            AppComponent = render(<App />);
        });

        when('the app displays a list of event', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            })
        });

        then('the event details are hidden by default', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).not.toBeInTheDocument();

        });
    });

    //Scenario 2
    test('User can expand an event to see details', ({ given, when, then }) => {
        let AppComponent;

        given('an event is displayed with collapsed details', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;

            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
        });

        when('the user interacts with the event to expand details', async () => {
            const button = AppComponent.queryAllByText('Show Details')[0];

            await userEvent.click(button);
        });

        then('the event details are shown', () => {
            const EventDOM = AppComponent.container.firstChild;
            const details = EventDOM.querySelector('.details');
            expect(details).toBeInTheDocument();
        });
    });

    //Scenario 3
    test('User can collapse an event to hide details', ({ given, when, then }) => {
        let AppComponent;
        let button;
        given('an event is displayed with expanded details', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;

            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });

            button = AppComponent.queryAllByText('Show Details')[0];
            await userEvent.click(button);

            const EventDOM = AppComponent.container.firstChild;
            const details = EventDOM.querySelector('.details');
            expect(details).toBeInTheDocument();
        });

        when('the user interacts with the event to collapse details', async () => {
            await userEvent.click(button);
        });

        then('the event details are hidden', () => {
            const EventDOM = AppComponent.container.firstChild;
            const details = EventDOM.querySelector('.details');
            expect(details).not.toBeInTheDocument();
        });
    });
});