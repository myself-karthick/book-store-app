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
import BookListModel from "../Modal/BookListModel";
export default function ViewOrders() {
    const [rowValues, setRowValues] = useState([]);
    const [headerValues, setHeaderValues] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookIdsList, setBookIdsList] = useState([]);
    const [listen, setListen] = useState(false);

    const { addSnackBar } = useSnackbars();

    const handleUpdateOrder = async (order) => {
        const orderStatusEnum = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
        ];
        const currentIndex = orderStatusEnum.indexOf(order.status);
        order.status = orderStatusEnum[currentIndex + 1];
        await axios
            .put("http://localhost:8080/order/update-order", order, {
                params: { id: order.id },
            })
            .then((response) => {
                console.log(response);
                addSnackBar({
                    message: "Order Updated Successfully",
                    type: "primary",
                    autoCloseTime: 2000,
                });
            });
        setListen(!listen);
    };

    const handleCancelOrder = async (order) => {
        order.status = "Cancelled";
        await axios
            .put("http://localhost:8080/order/update-order", order, {
                params: { id: order.id },
            })
            .then((response) => {
                console.log(response);
                addSnackBar({
                    message: "Order Updated Successfully",
                    type: "primary",
                    autoCloseTime: 2000,
                });
            });
        setListen(!listen);
    };

    const handleViewBookList = async (bookPurchased) => {
        try {
            const response = await axios.get(
                "http://localhost:8080/book/get-books-by-ids",
                {
                    params: { bookIdsList: bookPurchased.join(",") },
                }
            );
            const allBooks = response.data;

            setBookIdsList(allBooks);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching books data:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/order/get-all-orders")
            .then((response) => {
                const ordersData = response.data;
                setRowValues(
                    ordersData.map((order, index) => ({
                        rowId: index,
                        cellData: [
                            {
                                leadingComponents: (
                                    <div>
                                        <Button
                                            variant="solid"
                                            color="primary"
                                            onClick={() =>
                                                handleViewBookList(
                                                    order.booksPurchased
                                                )
                                            }
                                        >
                                            View Book List
                                        </Button>
                                    </div>
                                ),
                            },
                            { textValue: order.personName },
                            { textValue: order.address },
                            { textValue: order.mobile },
                            { textValue: order.status },
                            { textValue: order.totalAmount },
                            { textValue: order.dateOfOrder },
                            {
                                textValue:
                                    order.deliveredDate !== null
                                        ? order.deliveredDate
                                        : "Not Delivered",
                            },
                            {
                                leadingComponents: (
                                    <div>
                                        {order.status !== "Cancelled" &&
                                            order.status !== "Delivered" && (
                                                <>
                                                    <Button
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                        variant="solid"
                                                        color="primary"
                                                        onClick={() =>
                                                            handleUpdateOrder(
                                                                order
                                                            )
                                                        }
                                                    >
                                                        Update
                                                    </Button>
                                                    <Button
                                                        variant="solid"
                                                        color="danger"
                                                        onClick={() =>
                                                            handleCancelOrder(
                                                                order
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                </>
                                            )}
                                    </div>
                                ),
                            },
                        ],
                    }))
                );
            })
            .catch((error) => {
                console.error("Error fetching orders data:", error);
            });
    }, [listen]);

    useEffect(() => {
        setHeaderValues([
            { id: "0", textValue: "View Books" },
            { id: "1", textValue: "Customer name" },
            { id: "2", textValue: "Address" },
            { id: "3", textValue: "Mobile" },
            { id: "4", textValue: "Status" },
            { id: "5", textValue: "Total Amount" },
            { id: "6", textValue: "Date of Order" },
            { id: "7", textValue: "Delivered Date" },
            { id: "8", textValue: "Actions" },
        ]);
    }, []);

    return (
        <div style={{ padding: "10px 20px" }}>
            <ThemeProvider theme={defaultTheme}>
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
                {isModalOpen && (
                    <BookListModel
                        onClose={handleCloseModal}
                        bookIdsList={bookIdsList}
                    />
                )}
            </ThemeProvider>
        </div>
    );
}
