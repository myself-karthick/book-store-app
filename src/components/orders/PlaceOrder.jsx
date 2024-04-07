import { defaultTheme } from "@cxc/react-fpds-foundation";
import "../../styles/AddBookStyle.css";
import { TextInput, Button, ThemeProvider } from "@cxc/react-fpds-components";
import { useState } from "react";

export default function PlaceOrder() {
    const [formData, setFormData] = useState({
        personName: "",
        address: "",
        mobile: "",
        status: "Pending",
        dateOfOrder: Date.now(),
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <form className="inputForm">
                <TextInput
                    value={formData.personName}
                    placeholder="Person Name"
                    required={true}
                    labelProp={{ label: "Enter the person's name" }}
                    onChange={(e) => handleChange("personName", e.target.value)}
                />
                <TextInput
                    value={formData.address}
                    placeholder="Address"
                    required={true}
                    labelProp={{ label: "Enter the address" }}
                    onChange={(e) => handleChange("address", e.target.value)}
                />
                <TextInput
                    value={formData.mobile}
                    placeholder="Mobile"
                    required={true}
                    labelProp={{ label: "Enter the mobile number" }}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                />
                <Button type="submit">Place Order</Button>
            </form>
        </ThemeProvider>
    );
}
