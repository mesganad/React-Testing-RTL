
import { render, screen, waitFor } from '@testing-library/react';

import App from './App';
import {getUser} from './get-user';
import {mocked} from "ts-jest/utils";
jest.mock("./get-user");

const mockGetUser=mocked(getUser,true);

describe('when everything is ok', () => {

  beforeEach(async ()=>{
    render(<App/>);
    await waitFor(()=>expect(mockGetUser).toHaveBeenCalled());
  });

  test('should render the App component without crashing', () => {
    screen.debug();
  })

  //getByText()
  test('should select the children that is being passed to the CustomInput component', () => {
    const node1=screen.getAllByText(/Input/);
    expect(node1[0]).toBeInTheDocument();
    expect(node1.length).toEqual(1);

    //checking exception or error
    let error;
    try{
      screen.getByText('Input1');
    }
    catch(err){
      error=err;
    }
    expect(error).toBeDefined();
  })

  //getByRole()
  test('should select the input element by its role', () => {
    const node1=screen.getAllByRole('textbox');
    expect(node1.length).toEqual(1);
  })
  test('should select a label element by its text', () => {
    screen.getByLabelText('Input:');
    screen.debug();
  })
  
  test('should select input element by placeholder', () => {
    screen.getAllByPlaceholderText('search here');
  })

  //queryBy
  test('should not find the role "whatever" in our component', () => {
    expect(screen.queryByRole('whatever')).toBeNull();
  })  
})

//mocking a function
describe('when the component fetches the user successfully', () => {
  beforeEach(()=>{
    mockGetUser.mockClear();
  });

  test('should call getUser once', async () => {
    render(<App/>);
    await waitFor(()=>expect(mockGetUser).toHaveBeenCalledTimes(1));
  })
  
  test('should render the username passed', async () => {
    const name='John';    
    // mockGetUser.mockImplementationOnce(()=>Promise.resolve({ id: '1', name }));
    mockGetUser.mockResolvedValueOnce({ id: '1', name });
    render(<App/>);
    expect(screen.queryByText(/Username/)).toBeNull();
    screen.debug();
    expect(await screen.findByText(/name/)).toBeInTheDocument();
    screen.debug();
  })  
})

