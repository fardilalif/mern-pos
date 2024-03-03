import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.jsx";
import { Input } from "@/components/ui/input.jsx";

const FormFieldComp = ({
  form,
  formLabel,
  name,
  placeholder,
  type,
  required,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{name}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              required={required}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
export default FormFieldComp;
