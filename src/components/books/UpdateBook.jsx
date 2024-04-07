import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Button,
    TextInput,
    ThemeProvider,
    useSnackbars,
} from "@cxc/react-fpds-components";
import { defaultTheme } from "@cxc/react-fpds-foundation";

import { WarningFilled as Warning } from "@cxc/react-fpds-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearSelectedBookIds } from "../../redux/slice/BookSlice";

const UpdateBook = () => {
    const selectedBookIds = useSelector((state) => state.book.selectedBookIds);
    const [bookDetails, setBookDetails] = useState([]);
    const { addSnackBar } = useSnackbars();
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleRemoveBook = (index) => {
        const updatedDetails = [...bookDetails];
        updatedDetails.splice(index, 1);
        setBookDetails(updatedDetails);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/book/get-books-by-ids",
                    {
                        params: { bookIdsList: selectedBookIds.join(",") },
                    }
                );
                setBookDetails(response.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        if (selectedBookIds.length > 0) {
            fetchData();
        }
    }, [selectedBookIds]);

    const handleUpdateBook = async () => {
        try {
            const bookIds = bookDetails.map((book) => book.id);
            await axios
                .put("http://localhost:8080/book/update-books", bookDetails, {
                    params: { bookIds: bookIds.join(",") },
                })
                .then((response) => {
                    console.log(response);
                });
            await addSnackBar({
                message: "Books Updated Successfully",
                logo: <Warning aria-label="success" />,
                type: "success",
                autoCloseTime: 2000,
            });
            dispatch(clearSelectedBookIds());
            navigate("/book/view-books");
        } catch (error) {
            console.error("Error updating books:", error.message);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {selectedBookIds.length === 0 ? (
                <h3>Select some books to update</h3>
            ) : (
                <form className="inputForm" onSubmit={handleUpdateBook}>
                    {bookDetails.map((book, index) => (
                        <div key={index}>
                            <h3>Update Book: {book.title}</h3>
                            <TextInput
                                value={book.title}
                                placeholder="Book Title"
                                required={true}
                                labelProp={{ label: "Enter the book title" }}
                                onChange={(e) =>
                                    setBookDetails((prevDetails) => {
                                        const updatedDetails = [...prevDetails];
                                        updatedDetails[index].title =
                                            e.target.value;
                                        return updatedDetails;
                                    })
                                }
                            />
                            <TextInput
                                value={book.price}
                                placeholder="Book price"
                                required={true}
                                labelProp={{ label: "Enter the book price" }}
                                onChange={(e) =>
                                    setBookDetails((prevDetails) => {
                                        const updatedDetails = [...prevDetails];
                                        updatedDetails[index].price =
                                            e.target.value;
                                        return updatedDetails;
                                    })
                                }
                            />
                            <TextInput
                                value={book.stockCount}
                                placeholder="Book Stock"
                                required={true}
                                labelProp={{
                                    label: "Enter the book Stock Count",
                                }}
                                onChange={(e) =>
                                    setBookDetails((prevDetails) => {
                                        const updatedDetails = [...prevDetails];
                                        updatedDetails[index].stockCount =
                                            e.target.value;
                                        return updatedDetails;
                                    })
                                }
                            />
                            <Button
                                variant="solid"
                                color="primary"
                                as="button"
                                size="medium"
                                type="button"
                                onClick={() => handleRemoveBook(index)}
                            >
                                Remove Book
                            </Button>
                        </div>
                    ))}
                    <Button
                        variant="solid"
                        color="primary"
                        as="button"
                        size="medium"
                        type="submit"
                    >
                        Update Books
                    </Button>
                </form>
            )}
        </ThemeProvider>
    );
};

export default UpdateBook;
