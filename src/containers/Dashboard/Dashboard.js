import React, { useState, useRef, useEffect } from "react";
import MonthSpendCard from '../../components/MonthSpendCard.js/MonthSpendCard'
import SpendInputRow from '../../components/SpendInputRow/SpendInputRow'
import FirebaseConfig from '../../firebase.config'
import firebase from 'firebase/app';
require("firebase/database");

// Initialize Firebase
firebase.initializeApp(FirebaseConfig);

// States
const Dashboard = () => {
    const inputRef = useRef();
    const [budget, setBudget] = useState(0);
    const [enteredMonth, setEnteredMonth] = useState(null);
    const [enteredSpendRent, setEnteredSpendRent] = useState(null);
    const [enteredSpendGroceries, setEnteredSpendGroceries] = useState(null);
    const [enteredSpendTransport, setEnteredSpendTransport] = useState(null);
    const [enteredSpendEntertainment, setEnteredSpendEntertainment] = useState(null);
    const [savedMonthSpend, setSavedMonthSpend] = useState("loading"
    );

    //Fetch SPEND data from DB 
    useEffect(() => {
        setTimeout(() => {
            firebase.database().ref('spend').orderByChild('/dateCreated')
                .on('value', snapshot => {
                    let spend = [];
                    snapshot.forEach((spendSnapshot) => {
                        spend.push(spendSnapshot.val())
                    });
                    setSavedMonthSpend(spend)
                });
        }, 1000);
    }, []);



    //Fetch BUDGET data from DB 
    useEffect(() => {
        ("Fetching firebase to GET budgets...")
        fetch(`https://budget-app-c0755.firebaseio.com/budgets.json`).then(reponse => reponse.json()
        ).then(responseData => {
            const budgetData = responseData;
            setBudget(budgetData)
        })
    }, []);


    // Post new spend to DB

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
            .then(() => {
                setSavedMonthSpend(prevInput => [
                    ...prevInput,
                ]);
            }).then(() => {
                clearFormHandler()
            })
    };

    // Clear input form helper
    const clearFormHandler = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
    }

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


    // Return saved spends in cards
    let months = []
    if (savedMonthSpend !== "loading") {
        months =
            savedMonthSpend.map(row => {
                const data = row
                const id = Math.random()
                return <MonthSpendCard
                    key={id}
                    spending={data}
                    month={data.month}
                    budget={budget}
                />;
            })
    } else {
        months =
            <MonthSpendCard
                key={Math.random()}
                spending={savedMonthSpend}
            />;
    }

    // Return rows for input spend card. Linked to DB in case categories are ever updated
    let inputRows = ""
    if (savedMonthSpend !== "loading") {
        inputRows = Object.keys(savedMonthSpend[0].category).map((catKey) => {
            return <SpendInputRow
                key={catKey}
                cat={catKey}
                enteredSpendHandler={enteredSpendHandler}
            />;
        });
    } else {
        console.log(savedMonthSpend)
        inputRows =
            <SpendInputRow
                key={Math.random()}
                spending={savedMonthSpend}
            />;
    }

    // Return JSX
    return (
        <>
            <div className="bg-white px-8 flex h-20">
                <h1 className="font-bold text-2xl block my-auto">Monthly spending <span className="text-3xl" role="img" aria-label="Money emoji"> &#128184; </span> </h1>
            </div>
            <div className="max-w-7xl mx-8 my-4 px-8 py-4 border-gray-300 border rounded shadow">
                <div className="flex flex-col">
                    <table className="min-w-full max-w-full">
                        <thead>

                            <tr className="px-4 hover:bg-gray-100 transition-all ease-linear duration-200 cursor-pointer" >
                                <td className="w-1/2 whitespace-no-wrap">
                                    <input className=" my-4 appearance-none bg-transparent border-none w-full font-bold leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="New month name"
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
                        <tbody>
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
                    <div>{months}</div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;