import React, { useState, useRef, useEffect } from "react";
import MonthSpendCard from '../../components/MonthSpendCard.js/MonthSpendCard'
import SpendInputRow from '../../components/SpendInputRow/SpendInputRow'
import FirebaseConfig from '../../firebase.config'
import firebase from 'firebase/app';
require("firebase/database");

// Initialize Firebase
firebase.initializeApp(FirebaseConfig);

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
            category: {
                entertainment: 100,
                groceries: 200,
                rent: 300,
                transport: 400
            },
            month: "April"

        }]
    );

    //Fetch data from DB 
    useEffect(() => {
        firebase.database().ref('spend').orderByChild('/dateCreated')
            .on('value', snapshot => {
                console.log(snapshot)
                let spend = [];
                snapshot.forEach((spendSnapshot) => {
                    spend.push(spendSnapshot.val())
                });
                console.log(spend[1].category);
                setSavedMonthSpend(spend)
            });

        // ("Fetching firebase to GET spending...")
        // fetch(`https://budget-app-c0755.firebaseio.com/spend.json`).then(reponse => reponse.json()
        // ).then(responseData => {
        //     const loadedSpend = [];
        //     for (const key in responseData) {
        //         loadedSpend.push({
        //             [key]: {
        //                 category: responseData[key].category,
        //                 month: responseData[key].month,
        //             }
        //         });
        //     }
        //     console.log(loadedSpend)
        //     setSavedMonthSpend(loadedSpend)
        // })
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
        dateCreated: 0 - Date.now(),
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
            const data = row
            const id = "010101"

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
            <div className="bg-white px-8 flex h-20">
                <h1 className="font-bold text-2xl block my-auto">Monthly spending <span className="text-3xl" role="img" aria-label="Money emoji"> &#128184; </span> </h1>
            </div>
            <div className="max-w-7xl mx-8 my-4 px-8 py-4 border-gray-300 border rounded shadow">
                <div className="flex flex-col">
                    <table className="min-w-full max-w-full">
                        <thead>
                            <tr className="bg-white flex h-20 ">
                                <td className="font-bold text-2m block my-auto"> New month's spending </td>
                            </tr>
                            <tr className="px-4 hover:bg-gray-100 transition-all ease-linear duration-200 cursor-pointer" >
                                <td className="w-1/2 whitespace-no-wrap">
                                    <input className=" my-4 appearance-none bg-transparent border-none w-full font-bold leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="Write month"
                                        aria-label="Month"
                                        ref={inputRef}
                                        onChange={event => {
                                            setEnteredMonth(event.target.value)
                                        }}
                                    >
                                    </input>
                                </td>
                            </tr>
                        </thead>

                        <tbody >
                            {inputRows}
                        </tbody>

                    </table>
                    <div className=" my-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={e => {
                                addSpendHandler(spendInput, e)
                            }}>Save</button>
                    </div>
                </div>
            </div >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col">
                    <div className="bg-white">{months}</div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;