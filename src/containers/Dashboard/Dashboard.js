import React, { useState, useRef, useEffect } from "react";
import MonthSpendCard from '../../components/MonthSpendCard.js/MonthSpendCard'
import SpendInputRow from '../../components/SpendInputRow/SpendInputRow'

const Dashboard = () => {
    const inputRef = useRef();
    const [budget, setBudget] = useState(0);
    const [enteredMonth, setEnteredMonth] = useState(null);
    const [enteredSpendRent, setEnteredSpendRent] = useState(null);
    const [enteredSpendGroceries, setEnteredSpendGroceries] = useState(null);
    const [enteredSpendTransport, setEnteredSpendTransport] = useState(null);
    const [enteredSpendEntertainment, setEnteredSpendEntertainment] = useState(null);
    const [savedMonthSpend, setSavedMonthSpend] = useState([
        {
            "-MK5w46zDwWYIdDPjXWc": {
                category: {
                    entertainment: 0,
                    groceries: 0,
                    rent: 0,
                    transport: 0
                },
                month: "None"
            },
        }]
    );

    //Fetch data from DB 
    useEffect(() => {
        ("Fetching firebase to GET spending...")
        fetch(`https://budget-app-c0755.firebaseio.com/spend.json`).then(reponse => reponse.json()
        ).then(responseData => {
            const loadedSpend = [];
            for (const key in responseData) {
                loadedSpend.push({
                    [key]: {
                        category: responseData[key].category,
                        month: responseData[key].month,
                    }
                });
            }
            setSavedMonthSpend(loadedSpend)
        })
    }, []);

    //Fetch data from DB 
    useEffect(() => {
        ("Fetching firebase to GET budgets...")
        fetch(`https://budget-app-c0755.firebaseio.com/budgets.json`).then(reponse => reponse.json()
        ).then(responseData => {
            const budgetData = responseData;
            setBudget(budgetData)
        })
    }, []);


    //Spend inputs
    const spendInput = {
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

    // Budgets (to be replaced by DB inputs from Planner page)
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
    };

    // Call Firebase DB

    const addSpendHandler = spend => {
        console.log("Fetching firebase to POST...")
        fetch(`https://budget-app-c0755.firebaseio.com/spend.json`, {
            method: 'POST',
            body: JSON.stringify(spend),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                console.log(spend)
                setSavedMonthSpend(prevInput => [
                    ...prevInput,
                    {
                        "localId": {
                            ...spend
                        }
                    }
                ]);
            })
    };

    const months =
        savedMonthSpend.map(row => {
            const id = Object.keys(row)[0];
            const data = row[id];
            console.log(budget.category)
            // const budget = dbObject.budgets.category

            return <MonthSpendCard
                key={id}
                spending={data}
                month={data.month}
                budget={budget}
            />;
        })

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

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={e => {
                    addSpendHandler(spendInput, e)
                }}>Create</button>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col">
                    <div className="bg-white">{months}</div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;