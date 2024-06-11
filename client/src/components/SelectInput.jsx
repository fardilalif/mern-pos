import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectInput = ({ options, data, onValueChange }) => {
  return (
    <Select
      value={data.quantity}
      onValueChange={(value) => onValueChange(data._id, parseInt(value))}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select quantity" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option} key={option} className="text-center">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default SelectInput;
