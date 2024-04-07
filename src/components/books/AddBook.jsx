import {
    ThemeProvider,
    TextInput,
    Button,
    useSnackbars,
} from "@cxc/react-fpds-components";
import { defaultTheme } from "@cxc/react-fpds-foundation";
import { useState } from "react";
import "../../styles/AddBookStyle.css";
import axios from "axios";
import { WarningFilled as Warning } from "@cxc/react-fpds-icons";

export default function AddBook() {
    const [formEntries, setFormEntries] = useState([
        {
            title: "",
            author: "",
            genre: "",
            price: "",
            stockCount: "",
        },
    ]);

    const { addSnackBar } = useSnackbars();

    const handleAddEntry = () => {
        setFormEntries([
            ...formEntries,
            {
                title: "",
                author: "",
                genre: "",
                price: "",
                stockCount: "",
            },
        ]);
    };

    const handleRemoveEntry = (index) => {
        const updatedEntries = formEntries.filter((entry, i) => i !== index);
        setFormEntries(updatedEntries);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios
                .post("http://localhost:8080/book/add-books", formEntries)
                .then((response) => {
                    addSnackBar({
                        message: "Book Added Successfully",
                        logo: <Warning aria-label="success" />,
                        type: "success",
                        autoCloseTime: 2000,
                    });
                    console.log(response);
                });

            setFormEntries([
                {
                    title: "",
                    author: "",
                    genre: "",
                    price: "",
                    stockCount: "",
                },
            ]);
        } catch (error) {
            console.error("Error adding books:", error.message);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <form className="inputForm" onSubmit={handleSubmit}>
                {formEntries.map((formData, index) => (
                    <div key={index}>
                        <h3>Enter the details of book {index+1}</h3>
                        <TextInput
                            value={formData.title}
                            placeholder="Book Title"
                            required={true}
                            labelProp={{ label: "Enter the book title" }}
                            onChange={(e) => {
                                const updatedEntries = [...formEntries];
                                updatedEntries[index].title = e.target.value;
                                setFormEntries(updatedEntries);
                            }}
                        />
                        <TextInput
                            value={formData.author}
                            placeholder="Author of Book"
                            required={true}
                            labelProp={{ label: "Enter the Author Name" }}
                            onChange={(e) => {
                                const updatedEntries = [...formEntries];
                                updatedEntries[index].author = e.target.value;
                                setFormEntries(updatedEntries);
                            }}
                        />
                        <TextInput
                            value={formData.genre}
                            placeholder="Genre of Book"
                            required={true}
                            labelProp={{ label: "Enter the Genre of the Book" }}
                            onChange={(e) => {
                                const updatedEntries = [...formEntries];
                                updatedEntries[index].genre = e.target.value;
                                setFormEntries(updatedEntries);
                            }}
                        />
                        <TextInput
                            value={formData.price}
                            placeholder="Price of Book"
                            required={true}
                            labelProp={{ label: "Enter the Price of the Book" }}
                            onChange={(e) => {
                                const updatedEntries = [...formEntries];
                                updatedEntries[index].price = e.target.value;
                                setFormEntries(updatedEntries);
                            }}
                        />
                        <TextInput
                            value={formData.stockCount}
                            placeholder="Stock Count"
                            required={true}
                            labelProp={{ label: "Enter the Stock Count" }}
                            onChange={(e) => {
                                const updatedEntries = [...formEntries];
                                updatedEntries[index].stockCount =
                                    e.target.value;
                                setFormEntries(updatedEntries);
                            }}
                        />
                        <br />
                        {index !== 0 && (
                            <Button
                                variant="solid"
                                color="primary"
                                as="button"
                                size="medium"
                                onClick={() => handleRemoveEntry(index)}
                            >
                                Remove Book
                            </Button>
                        )}
                        <br />
                        <br />
                    </div>
                ))}
                <Button
                    variant="solid"
                    color="primary"
                    as="button"
                    size="medium"
                    type="submit"
                >
                    Add Books
                </Button>
                <Button
                    variant="solid"
                    color="primary"
                    as="button"
                    size="medium"
                    onClick={handleAddEntry}
                >
                    Add Another Book
                </Button>
            </form>
        </ThemeProvider>
    );
}
