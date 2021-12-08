import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CustomInput from './CustomInput';
jest.mock("./get-user");


describe('when everthing is ok', () => {
    test('should call the onChange callback handler when using fireEvent function', () => {
        const onChange=jest.fn();
        render(<CustomInput value="" onChange={onChange}>
            Input:
        </CustomInput>);
        fireEvent.change(screen.getByRole('textbox'), {
            target:{value: 'David'}
        });
        expect(onChange).toHaveBeenCalledTimes(1);
    })
    test('should call the onChange callback handler when using the userEvet API', async () => {
        const onChange=jest.fn();
        render(<CustomInput value="" onChange={onChange}>
            Input:
        </CustomInput>);
       await userEvent.type(screen.getByRole('textbox'),"David");
        expect(onChange).toHaveBeenCalledTimes(5);
    })   

    test('should call the onChange callback handler when using the userEvet API using and key-stroke', async () => {
        const onChange=jest.fn();
        let name="David";
        render(<CustomInput value="" onChange={onChange}>
            Input:
        </CustomInput>);
        await userEvent.type(screen.getByRole('textbox'),name);
        expect(onChange).toHaveBeenCalledTimes(5);             
    })   
    
})
