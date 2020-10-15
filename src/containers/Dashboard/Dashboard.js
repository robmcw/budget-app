import React, { useState, useRef } from "react";
import MonthSpendCard from '../../components/MonthSpendCard.js/MonthSpendCard'
import SpendInputRow from '../../components/SpendInputRow/SpendInputRow'

// Static design. Multiple tables 

const Dashboard = () => {
    const inputRef = useRef();
    const [enteredMonth, setEnteredMonth] = useState(null);
    const [enteredSpendRent, setEnteredSpendRent] = useState(null);
    const [enteredSpendGroceries, setEnteredSpendGroceries] = useState(null);
    const [enteredSpendTransport, setEnteredSpendTransport] = useState(null);
    const [enteredSpendEntertainment, setEnteredSpendEntertainment] = useState(null);

    const state = {
        month: enteredMonth,
        category: {
            rent: enteredSpendRent,
            groceries: enteredSpendGroceries,
            transport: enteredSpendTransport,
            entertainment: enteredSpendEntertainment
        }
    };

    const enteredSpendHandler = (input, cat) => {
        switch (cat) {
            case 'rent':
                setEnteredSpendRent(input)
                break;
            case 'groceries':
                setEnteredSpendGroceries(input)
                break;
            case 'transport':
                setEnteredSpendTransport(input)
                break;
            case 'entertainment':
                setEnteredSpendEntertainment(input)
                break;
            default:
                console.error('ERROR: NO CATEGORIES MATCHED')
        }
    };

    console.log(state.month)
    console.log(state.category.rent)
    console.log(state.category.groceries)
    console.log(state.category.transport)
    console.log(state.category.entertainment)

    const dbObject = {
        budgets: {
            category: {
                rent: {
                    name: "Rent",
                    percentage: 30,
                    monthly: 700,
                    annual: 1000,
                    category: "Essential"
                },
                groceries: {
                    name: "Groceries",
                    percentage: 8,
                    monthly: 150,
                    annual: 1000,
                    category: "Essential"
                },
                transport: {
                    name: "Transport",
                    percentage: 4,
                    monthly: 90,
                    annual: 1000,
                    category: "Essential"
                },
                entertainment: {
                    name: "Entertainment",
                    percentage: 12,
                    monthly: 310,
                    annual: 1000,
                    category: "Luxury"
                }
            },
        },

        spending: {
            month: {
                june: {
                    rent: {
                        name: "Rent",
                        spent: 600,
                        category: "Essential"
                    },
                    groceries: {
                        name: "Groceries",
                        spent: 150,
                        category: "Essential"
                    },
                    transport: {
                        name: "Transport",
                        spent: 101,
                        category: "Essential"
                    },
                    entertainment: {
                        name: "Entertainment",

                        spent: 300,
                        category: "Luxury"
                    },

                },
                july: {

                    rent: {
                        name: "Rent",
                        spent: 78,
                        category: "Essential"
                    },
                    groceries: {
                        name: "Groceries",
                        spent: 733,
                        category: "Essential"
                    },
                    transport: {
                        name: "Transport",
                        spent: 765,
                        category: "Essential"
                    },
                    entertainment: {
                        name: "Entertainment",
                        percentage: 12,
                        spent: 765,
                        category: "Luxury"
                    },

                },
                august: {
                    rent: {
                        name: "Rent",
                        spent: 800,
                        category: "Essential"
                    },
                    groceries: {
                        name: "Groceries",
                        spent: 876,
                        category: "Essential"
                    },
                    transport: {
                        name: "Transport",
                        spent: 844,
                        category: "Essential"
                    },
                    entertainment: {
                        name: "Entertainment",
                        percentage: 12,
                        spent: 843,
                        category: "Luxury"
                    },

                },
            },
        },
    }

    const months = Object.keys(dbObject.spending.month).map((monthKey) => {
        return <MonthSpendCard
            key={monthKey}
            spending={dbObject.spending.month[monthKey]}
            month={monthKey}
        />;
    });

    //Loop through categories and produce row for each containing category name prefilld

    const inputRows = Object.keys(dbObject.budgets.category).map((catKey) => {
        return <SpendInputRow
            key={catKey}
            cat={catKey}
            enteredSpendHandler={enteredSpendHandler}
        />;
    });

    return (
        <>


            <table className="min-w-full max-w-full">

                <thead>
                    <tr className="bg-white px-8 flex h-20 border-b border-gray-300">
                        <td className="font-bold text-2m block my-auto">Input spending</td>
                    </tr>
                    <tr className="hover:bg-gray-100 transition-all ease-linear duration-200 cursor-pointer" >
                        <td className="w-1/2 whitespace-no-wrap border-b border-gray-200">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Month"
                                aria-label="Month"
                                ref={inputRef}
                                onChange={event => {
                                    setEnteredMonth(event.target.value)
                                }}
                            >
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th className="w-1/2 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Category
      </th>
                        <th className="w-1/2 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Spent
      </th>
                    </tr>
                </thead>
                <tbody>
                    {inputRows}
                </tbody>
            </table>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col">
                    <div className="bg-white">{months}</div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;