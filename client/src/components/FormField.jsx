import { Input } from "./ui/input.jsx";
import { Label } from "./ui/label.jsx";

const FormField = ({ id, label, name, placeholder, required, type }) => {
  return (
    <div className="flex flex-col justify-center gap-y-1.5 w-full ">
      <Label htmlFor={id} className="capitalize">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};
export default FormField;
