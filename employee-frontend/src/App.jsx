import { VStack } from '@chakra-ui/react';
import React from 'react';
import EmployeeTable from './components/ui/employeeTable';
import { useQuery } from '@tanstack/react-query';
import { baseUrl} from "../constants/global_variable.js";
import InputEmployee from './components/ui/inputEmployee.jsx';
import { DialogTrigger } from './components/ui/dialog.jsx';
import { Button } from '@chakra-ui/react';


const App = () => {

  async function fetchEmployeeDetails(params) {
    const res = await fetch(baseUrl);
    const data = await res.json();
    if(!res.ok){
      throw new Error(data.error);    //to get the specific error that may occur
    }
    return data;

    
  }

  const {isPending, isError, data, error} = useQuery({
    queryKey: ["employee_details"],
    queryFn: fetchEmployeeDetails,

  });

  if (isPending) return "Loading"

  if (isError) return error.message;

  console.log("data from postgre_db:",data);
  return (
      <VStack gap="6" align="flex-start">
        <InputEmployee>
          <DialogTrigger asChild>
            <Button variant="outline">Add Employee </Button>
          </DialogTrigger>
        </InputEmployee>
        <EmployeeTable  data={data}/>
      </VStack>  
   
  );
  
};


export default App;