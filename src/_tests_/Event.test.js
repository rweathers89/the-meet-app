// src/__tests__/Event.test.js

import { render } from '@testing-library/react';
import mockData from '../mock-data';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const event = mockData[0];

describe('<Event /> component', () => {
    let EventComponent;
    let allEvents;

    beforeEach(async () => {
        allEvents = await getEvents();
    });

    beforeEach(() => {
        EventComponent = render(<Event event={event} />);
    });

    test('has the events title', () => {
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });

    test('has the events time', () => {
        expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
    });

    test('renders event location', () => {
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });

    test('renders event details button with the title "show details"', () => {
        expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
    });

    test('by default event details are hidden', () => {
        expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
    });

    test('show details after user clicks button "show details"', async () => {
        const user = userEvent.setup();
        const button = EventComponent.queryByRole('button');
        await user.click(button, 'Show Details');
        const details = EventComponent.container.querySelector('.details')
        expect(details).toBeInTheDocument();
    });

    test('hide details after user clicks button "hide details"', async () => {
        const user = userEvent.setup();
        const button = EventComponent.queryByRole('button');
        const details = EventComponent.container.querySelector('.details')
        await user.click(button, 'Hide Details');
        expect(details).not.toBeInTheDocument();
    });
});