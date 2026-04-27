import React from 'react'
import { For, Stack, Table } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { HStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { queryClient } from '../../../utils/queryClient.js';
import { baseUrl } from '../../../constants/global_variable.js';
import InputEmployee from './inputEmployee.jsx';
import { DialogTrigger } from './dialog.jsx';

const EmployeeTable = ({data}) => {
    //if there is no data in the table
    if (!data.length){
        return <h1>You don,t have any employee data!</h1>
    }

    const mutation = useMutation({
        mutationFn: async(id) => {
            console.log("mutation function: ",id)
            const response = await fetch(baseUrl + "/" + id,{
                method:"DELETE",
                headers: {
                    "Content-Type":"application/json"
                }
            });
            const data = await response.json();
            if (!response.ok){
                throw new Error(data.error)
            }
            return data;

        },
        onError: (error) => {
            console.log(error.message);

            toast.error(error.message);

        },
        onSuccess: () => {
            toast.success("Employee details deleted");
            queryClient.invalidateQueries({queryKey: ["employee_details"]})
        },
    });
    return (
         <Stack gap="10">
          <Table.Root size="md" variant= "outline">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>ID</Table.ColumnHeader>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Email</Table.ColumnHeader>
                <Table.ColumnHeader>Age</Table.ColumnHeader>
                <Table.ColumnHeader>Role</Table.ColumnHeader>
                <Table.ColumnHeader>Salary</Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.age}</Table.Cell>
                  <Table.Cell>{item.role}</Table.Cell>
                  <Table.Cell>{item.salary}</Table.Cell>
                  <Table.Cell>
                    <HStack gap="3">
                    <MdDelete size={18} className="icon" onClick={()=>mutation.mutate(item.id)}/>
                       <InputEmployee data={item} type="update">
                        <DialogTrigger asChild>
                           <FaRegEdit size={18} className="icon"/>
                          </DialogTrigger>
                       </InputEmployee>
                   
                    </HStack>
                  </Table.Cell>
                  
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        
    </Stack>
    );
};

export default EmployeeTable;


  