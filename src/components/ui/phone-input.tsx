import * as React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  required?: boolean;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, placeholder, className, id, required, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState("");
    const [countryCode, setCountryCode] = React.useState("1");

    // Format phone number to (xxx)xxx-xxxx
    const formatPhoneNumber = (input: string) => {
      // Remove all non-digits
      const digits = input.replace(/\D/g, '');
      
      // Apply formatting
      if (digits.length >= 6) {
        return `(${digits.slice(0, 3)})${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
      } else if (digits.length >= 3) {
        return `(${digits.slice(0, 3)})${digits.slice(3)}`;
      } else {
        return digits;
      }
    };

    // Update display value when value prop changes
    React.useEffect(() => {
      if (value) {
        // Remove country code if present
        const cleanNumber = value.replace(/^\+?1/, '');
        setDisplayValue(formatPhoneNumber(cleanNumber));
      }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const digits = input.replace(/\D/g, '');
      
      // Limit to 10 digits
      const limitedDigits = digits.slice(0, 10);
      
      // Update display
      const formatted = formatPhoneNumber(limitedDigits);
      setDisplayValue(formatted);
      
      // Update actual value with country code
      if (limitedDigits.length > 0) {
        onChange(countryCode + limitedDigits);
      } else {
        onChange("");
      }
    };

    return (
      <div className={cn("flex", className)}>
        <Select value={countryCode} onValueChange={setCountryCode}>
          <SelectTrigger className="w-24 rounded-r-none border-r-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">🇺🇸 +1</SelectItem>
          </SelectContent>
        </Select>
        <Input
          ref={ref}
          id={id}
          type="tel"
          value={displayValue}
          onChange={handleInputChange}
          placeholder={placeholder || "(555)123-4567"}
          className="rounded-l-none flex-1"
          required={required}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";