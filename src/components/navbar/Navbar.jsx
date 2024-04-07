import { defaultTheme } from "@cxc/react-fpds-foundation";
import "../../styles/Navbar.css";
import {
    Button,
    Tab,
    TabList,
    Tabs,
    ThemeProvider,
} from "@cxc/react-fpds-components";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Navbar() {
    const bookPaths = [
        { pageName: "View Books", url: "/book/view-books" },
        { pageName: "Add Book", url: "/book/add-book" },
        { pageName: "Update Book", url: "/book/update-book" },
    ];

    const orderPaths = [
        { pageName: "View Orders", url: "/order/view-orders" },
        { pageName: "Add Order", url: "/order/place-order" },
    ];

    const [tabsForNav, setTabsForNav] = useState(bookPaths);
    const [activeTab, setActiveTab] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (bookPaths.find((tabele) => tabele.url === location.pathname)) {
            setTabsForNav(bookPaths);
            setActiveTab(
                bookPaths.findIndex(
                    (tabele) => tabele.url === location.pathname
                )
            );
        } else if (
            orderPaths.find((tabele) => tabele.url === location.pathname)
        ) {
            setTabsForNav(orderPaths);
            setActiveTab(
                orderPaths.findIndex(
                    (tabele) => tabele.url === location.pathname
                )
            );
        }
    }, [location]);

    const update = (e) => {
        navigate(tabsForNav[e].url);
        setActiveTab(e);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <div className="navbar">
                <div className="upperNav">
                    <div className="upperLeftNav">
                        <div
                            className="companyLogo"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Book Store
                        </div>
                    </div>
                    <div className="upperRightNav">
                        <Button
                            onClick={(e) => {
                                navigate("/book/view-books");
                                setTabsForNav(bookPaths);
                            }}
                            size="small"
                            variant="solid"
                            color="primary"
                            as="button"
                        >
                            Book
                        </Button>
                        <Button
                            onClick={(e) => {
                                navigate("/order/view-orders");
                                setTabsForNav(orderPaths);
                            }}
                            size="small"
                            variant="solid"
                            color="primary"
                            as="button"
                        >
                            Order
                        </Button>
                    </div>
                </div>
                <div className="lowerNav">
                    <Tabs
                        size="small"
                        {...{ activeTab, setActiveTab }}
                        setActiveTab={update}
                    >
                        <TabList>
                            {tabsForNav.map((tabEle) => {
                                return <Tab>{tabEle.pageName}</Tab>;
                            })}
                        </TabList>
                    </Tabs>
                </div>
            </div>
        </ThemeProvider>
    );
}
