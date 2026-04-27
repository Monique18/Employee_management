import React from 'react'
import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText
 } from "./select.jsx"

const SelectRole = ({setInfo}) =>{
  return (
    <Select.Root collection={roles} size="sm" width="320px" 
    onChange={(e)=>setInfo((prev)=>({...prev,role: e.target.value}))}
    >
      <Select.HiddenSelect />
      <Select.Label>Select Role</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select roles" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {roles.items.map((role) => (
              <Select.Item item={role} key={role.value}>
                {role.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default SelectRole;


const roles = createListCollection({
  items: [
    { label: "HR", value: "HR" },
    { label: "Developer", value: "Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Intern", value: "Intern" },
  ],
});