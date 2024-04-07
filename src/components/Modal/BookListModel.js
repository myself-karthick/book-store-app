import { useState } from "react";
import {
    ModalWindow,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    ThemeProvider,
} from "@cxc/react-fpds-components";
import { defaultTheme } from "@cxc/react-fpds-foundation";

export default function BookListModel(props) {
    const [isOpen, setIsOpen] = useState(true);

    const { bookIdsList } = props;

    const handleCloseModal = () => {
        setIsOpen(false);
        props.onClose();
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <ModalWindow
                variant={"small"}
                isOpen={isOpen}
                onClose={handleCloseModal}
            >
                <ModalHeader headingLevel={"h1"} onClose={handleCloseModal}>
                    Book List
                </ModalHeader>
                <ModalBody>
                    {bookIdsList.reduce((acc, book) => {
                        const existingBook = acc.find((b) => b.id === book.id);
                        if (existingBook) {
                            existingBook.quantity += 1;
                        } else {
                            acc.push({ id: book.id, title: book.title, quantity: 1 });
                        }
                        return acc;
                    }, []).map((book) => (
                        <div key={book.id}>
                            {book.title} - Quantity: {book.quantity}
                        </div>
                    ))}
                </ModalBody>
                <ModalFooter placement="left">
                    <Button onClick={handleCloseModal}>Close</Button>
                </ModalFooter>
            </ModalWindow>
        </ThemeProvider>
    );
    
}
