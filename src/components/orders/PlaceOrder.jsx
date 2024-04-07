import { defaultTheme } from "@cxc/react-fpds-foundation";
import "../../styles/AddBookStyle.css";
import { TextInput, Button, ThemeProvider } from "@cxc/react-fpds-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function PlaceOrder() {
    const selectedBookIds = useSelector((state) => state.book.selectedBookIds);
    const [formData, setFormData] = useState({
        personName: "",
        address: "",
        mobile: "",
        status: "Pending",
        dateOfOrder: "",
        booksPurchased: [],
    });
    const [bookDetails, setBookDetails] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        if (selectedBookIds.length > 0) {
            axios
                .get("http://localhost:8080/book/get-books-by-ids", {
                    params: { bookIdsList: selectedBookIds.join(",") },
                })
                .then((response) => {
                    setBookDetails(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching book details:", error);
                });
        }
    }, [selectedBookIds]);

    const handleSubmit = (e) => {
        e.preventDefault();

        formData.booksPurchased = formData.booksPurchased.flatMap((book) =>
            Array.from({ length: book.quantity }, () => book.id)
        );
        axios
            .post("http://localhost:8080/order/place-order", formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error("Error placing order:", error);
            });
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const calculateTotalCost = () => {
        let total = 0;
        formData.booksPurchased.forEach((book) => {
            const selectedBook = bookDetails.find((b) => b.id === book.id);
            if (selectedBook) {
                total += selectedBook.price * book.quantity;
            }
        });
        setTotalCost(total);
    };

    useEffect(() => {
        calculateTotalCost();
    }, [formData.booksPurchased]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <form className="inputForm" onSubmit={handleSubmit}>
                <p>Total Cost: {totalCost}</p>
                {bookDetails.map((book) => (
                    <div key={book.id}>
                        <p>
                            {book.title} - Available Stock: {book.stockCount}
                        </p>
                        <TextInput
                            placeholder="Quantity"
                            required={true}
                            labelProp={{
                                label: "Enter the quantity for this book",
                            }}
                            onChange={(e) => {
                                const quantity = parseInt(e.target.value);
                                const updatedBooksPurchased = [
                                    ...formData.booksPurchased,
                                ];
                                const bookItem = {
                                    id: book.id,
                                    title: book.title,
                                    quantity,
                                };
                                const existingIndex =
                                    updatedBooksPurchased.findIndex(
                                        (item) => item.id === book.id
                                    );
                                if (existingIndex !== -1) {
                                    updatedBooksPurchased[existingIndex] =
                                        bookItem;
                                } else {
                                    updatedBooksPurchased.push(bookItem);
                                }
                                setFormData({
                                    ...formData,
                                    booksPurchased: updatedBooksPurchased,
                                });
                            }}
                        />
                    </div>
                ))}
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
