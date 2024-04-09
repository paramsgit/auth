import React,{useState} from 'react';
import Select from 'react-select-tailwind';

interface IComboBoxProps {
}

const ComboBoxFile: React.FunctionComponent<IComboBoxProps> = (props) => {
  const [value, setValue] = useState(null);
  const [animal, setAnimal] = useState(null);
  const options = [
    { value: "fox", label: "Fox" },
    { value: "Butterfly", label: "Butterfly", icon:"i" },
    { value: "Honeybee", label: "Honeybee", icon: "😍" }
];
  const handleChange = (value:any) => {
      console.log("value:", value);
      setAnimal(value);
  };
  return <>
  <Select
  primaryColor={"blue"}
  isSearchable={true}
            value={animal}
            onChange={handleChange}
            options={options}
        />
  </>;
};

export default ComboBoxFile;
