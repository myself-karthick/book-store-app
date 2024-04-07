import React, { useState, useEffect } from "react";
import {
    Button,
    ComposedTable,
    TableProviderV1,
    ThemeProvider,
    useSnackbars,
} from "@cxc/react-fpds-components";
import axios from "axios";
import { defaultTheme } from "@cxc/react-fpds-foundation";
import "../../styles/ViewBooksStyle.css";
import { WarningFilled as Warning } from "@cxc/react-fpds-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    addSelectedBookId,
    removeSelectedBookId,
} from "../../redux/slice/BookSlice";

export default function ViewBooks() {
    const [rowValues, setRowValues] = useState([]);
    const [headerValues, setHeaderValues] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const dispatch = useDispatch();
    const { addSnackBar } = useSnackbars();
    const navigate = useNavigate();

    const handleCheckboxChange = (rowId) => {
        if (selectedRows.includes(rowId)) {
            setSelectedRows(selectedRows.filter((id) => id !== rowId));
            dispatch(removeSelectedBookId(rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
            dispatch(addSelectedBookId(rowId));
        }
    };

    const handleUpdate = () => {
        navigate("/book/update-book");
    };

    const handleOrder = () => {
        navigate("/order/place-order");
    }

    const handleDelete = async () => {
        if (selectedRows.length === 0) {
            await addSnackBar({
                message: "Deleted Successfully",
                logo: <Warning aria-label="success" />,
                type: "success",
                autoCloseTime: 2000,
            });
        }
        axios
            .delete("http://localhost:8080/book/delete-books", {
                data: selectedRows,
            })
            .then((response) => {
                console.log("Books deleted successfully");
                const updatedRowValues = rowValues.filter(
                    (row) => !selectedRows.includes(row.rowId)
                );
                setRowValues(updatedRowValues);
                setSelectedRows([]);
            })
            .catch((error) => {
                console.error("Error deleting books:", error);
            });
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/book/get-all-books")
            .then((response) => {
                const booksData = response.data;
                setRowValues(
                    booksData.map((book, index) => ({
                        rowId: index,
                        checkboxDefaultValue: 0,
                        cellData: [
                            {
                                leadingComponents: (
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(book.id)}
                                        onChange={() =>
                                            handleCheckboxChange(book.id)
                                        }
                                    />
                                ),
                            },
                            { textValue: book.title },
                            { textValue: book.author },
                            { textValue: book.genre },
                            { textValue: book.price },
                            { textValue: book.stockCount },
                        ],
                    }))
                );
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [selectedRows, setSelectedRows]);

    useEffect(() => {
        setHeaderValues([
            {
                id: "0",
                textValue: "Select",
            },
            {
                id: "1",
                textValue: "Title",
                isSortingEnabled: true,
                sortingProp: {
                    isSortingEnabled: true,
                },
            },
            { id: "2", textValue: "Author", isSortingEnabled: false },
            { id: "3", textValue: "Genre", isSortingEnabled: false },
            {
                id: "4",
                textValue: "Price",
                isSortingEnabled: true,
                sortingProp: {
                    isSortingEnabled: true,
                },
            },
            { id: "5", textValue: "Stock Count", isSortingEnabled: false },
        ]);
    }, []);

    return (
        <div style={{ padding: "10px 20px" }}>
            <ThemeProvider theme={defaultTheme}>
                {selectedRows.length > 0 && (
                    <div className="button-row">
                        <Button onClick={handleUpdate}> Update </Button>
                        <Button onClick={handleOrder}> Order </Button>
                        <Button onClick={handleDelete}> Delete </Button>
                    </div>
                )}

                <TableProviderV1>
                    <ComposedTable
                        isCheckboxEnabled={false}
                        isOptionProps={{ isOptionsEnabled: false }}
                        isStickyColumnEnabled={false}
                        paginationProp={{
                            isPaginationEnabled: false,
                            tablePage: 1,
                            itemsPerPage: 10,
                        }}
                        headerValues={headerValues}
                        rowValues={rowValues}
                    />
                </TableProviderV1>
            </ThemeProvider>
        </div>
    );
}
