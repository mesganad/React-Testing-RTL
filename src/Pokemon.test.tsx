import axios from 'axios';
import { render, screen } from '@testing-library/react';
import Pokemon from './Pokemon';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

const mockedAxios=axios as jest.Mocked<typeof axios>;

 
describe('when the user enters a valid pokemon name', () => {
    test('should show the pokemon abilities of that pokemon', async () => {
        const abilities = [
            {
            ability: {
                name: "Test ability1",
                url: "http//ability.com/ability1",
            },
        },
        {
            ability: {
                name: "Test ability2",
                url: "http//ability.com/ability2",
            },
        },
        ];

        mockedAxios.get.mockResolvedValueOnce({data:{abilities}});
        render(<Pokemon/>)
        await userEvent.type(screen.getByText('Pokemon name:'), 'ditto');
        await userEvent.click(screen.getByRole('button'));
        const returnedAbilities=await screen.findAllByRole('listitem');
        expect(returnedAbilities).toHaveLength(2);
    })
})
describe('when the user enters an invalid pokemon name', () => {
    test('should show an error message on the', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error());
        render(<Pokemon/>)
        await userEvent.type(screen.getByText('Pokemon name:'), 'invalid-pokemon-name');
        await userEvent.click(screen.getByRole('button'));
        const message=await screen.findByText(/Something went wrong/);
        expect(message).toBeInTheDocument();
    })
    })
    


