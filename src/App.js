import { Route, Routes } from "react-router";
import AddBook from "./components/books/AddBook";
import UpdateBook from "./components/books/UpdateBook";
import ViewBooks from "./components/books/ViewBooks";
import PlaceOrder from "./components/orders/PlaceOrder";
import ViewOrders from "./components/orders/ViewOrders";
import { SnackbarProvider } from "@cxc/react-fpds-components";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ViewBooks />}></Route>
                <Route path="/book">
                    <Route
                        index
                        path="view-books"
                        element={
                            <SnackbarProvider>
                                <ViewBooks />
                            </SnackbarProvider>
                        }
                    ></Route>
                    <Route
                        index
                        path="add-book"
                        element={
                            <SnackbarProvider>
                                <AddBook />
                            </SnackbarProvider>
                        }
                    ></Route>
                    <Route
                        index
                        path="update-book"
                        element={
                            <SnackbarProvider>
                                <UpdateBook />
                            </SnackbarProvider>
                        }
                    ></Route>
                </Route>
                <Route path="/order">
                    <Route
                        index
                        path="view-orders"
                        element={
                            <SnackbarProvider>
                                <ViewOrders />
                            </SnackbarProvider>
                        }
                    ></Route>
                    <Route
                        index
                        path="place-order"
                        element={
                            <SnackbarProvider>
                                <PlaceOrder />
                            </SnackbarProvider>
                        }
                    ></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
