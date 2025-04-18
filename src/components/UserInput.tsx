import React, {useRef, useState} from 'react';
import {render, Box, Text} from 'ink';
import TextInput, { UncontrolledTextInput } from 'ink-text-input';

type InputProps = {
	onSubmit: (query: string) => void;
}

const UserInput: React.FC<InputProps> = ({ onSubmit }) => {

	const [inputValue, setInputValue] = useState('');  // Controlled state for the input

	const handleSubmit = (query: string) => {
		setInputValue('')
	  // Pass the user input back to the parent component
	  onSubmit(query);
	};
  
	return (
	  <Box>
		<Box marginRight={1} borderStyle={'round'} width={50} paddingRight={5}>
		  <TextInput
		  	onSubmit={handleSubmit} 
		  	placeholder={"Query"}
			value={inputValue}
			onChange={setInputValue}
			/>
		</Box>
	  </Box>
	);
  };


export default UserInput;
