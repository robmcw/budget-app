import React, { useState, useEffect, useRef } from "react";
import PlannerRow from "../../components/PlannerRow/PlannerRow";


const Planner = () => {

    const inputRef = useRef();
    const [enteredIncome, setEnteredIncome] = useState(0);
    const [savedIncome, setSavedIncome] = useState(0);
    const [monthlyRent, SetMonthlyRent] = useState(0);
    const [annualRent, SetAnnualRent] = useState(0);
    const [monthlyGroceries, SetMonthlyGroceries] = useState(0);
    const [annualGroceries, SetAnnualGroceries] = useState(0);
    const [monthlyTransport, SetMonthlyTransport] = useState(0);
    const [annualTransport, SetAnnualTransport] = useState(0);
    const [monthlyEntertainment, SetMonthlyEntertainment] = useState(0);
    const [annualEntertainment, SetAnnualEntertainment] = useState(0);

    //Fetch budget data from DB and update states to update datatable
    useEffect(() => {
        console.log("Fetching firebase to GET budget...")
        fetch(`https://budget-app-c0755.firebaseio.com/budgets.json`).then(reponse => reponse.json()
        ).then(responseData => {
            SetMonthlyRent(responseData.rent.monthly)
            SetAnnualRent(responseData.rent.annual)
            SetMonthlyGroceries(responseData.groceries.monthly)
            SetAnnualGroceries(responseData.groceries.annual)
            SetMonthlyTransport(responseData.transport.monthly)
            SetAnnualTransport(responseData.transport.annual)
            SetMonthlyEntertainment(responseData.entertainment.monthly)
            SetAnnualEntertainment(responseData.entertainment.annual)
        })
    }, []);

    useEffect(() => {
        console.log("Fetching firebase to GET income...")
        fetch(`https://budget-app-c0755.firebaseio.com/income.json`).then(reponse => reponse.json()
        ).then(responseData => {
            setSavedIncome(responseData)
        })
    }, []);

    // Initial values, fixed percentages and object structure for budgets. 

    const budgets = {
        entertainment: {
            name: "Entertainment",
            percentage: 12,
            monthly: monthlyEntertainment,
            annual: annualEntertainment,
            category: "Luxury"
        },

        groceries: {
            name: "Groceries",
            percentage: 8,
            monthly: monthlyGroceries,
            annual: annualGroceries,
            category: "Essential"
        },

        rent: {
            income: savedIncome,
            name: "Rent",
            percentage: 30,
            monthly: monthlyRent,
            annual: annualRent,
            category: "Essential"
        },
        transport: {
            name: "Transport",
            percentage: 4,
            monthly: monthlyTransport,
            annual: annualTransport,
            category: "Essential"
        },
    };

    const incomeHandler = (income, budgets) => {
        Object.keys(budgets).map((catKey) => {
            const newAnnual = Math.round((income / 100 * budgets[catKey].percentage));
            const newMonthly = Math.round(newAnnual / 12);

            switch (budgets[catKey].name) {
                case 'Rent':
                    SetMonthlyRent(newMonthly)
                    SetAnnualRent(newAnnual)
                    break;

                case 'Groceries':
                    SetMonthlyGroceries(newMonthly)
                    SetAnnualGroceries(newAnnual)
                    break;

                case 'Transport':
                    SetMonthlyTransport(newMonthly)
                    SetAnnualTransport(newAnnual)
                    break;

                case 'Entertainment':
                    SetMonthlyEntertainment(newMonthly)
                    SetAnnualEntertainment(newAnnual)
                    break;

                default:
                    return (console.error('Error'))
            }
        })
    };

    // If input income changes, call incomeHandler  after a delay of 2000 m/s
    useEffect(() => {
        setTimeout(() => {
            if (enteredIncome !== 0 || inputRef.current.value) {
                incomeHandler(parseInt(inputRef.current ? inputRef.current.value : 0), budgets)
            };
        }, 2000);
    }, [enteredIncome, budgets]);


    // If user clicks SAVE, add budget to DB
    const addBudgetHandler = budgets => {
        console.log("Fetching firebase to POST...")
        fetch(`https://budget-app-c0755.firebaseio.com/budgets.json`, {
            method: 'PUT',
            body: JSON.stringify(budgets),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                return response.json()
            })
    };

    // If user clicks SAVE, add budget to DB (could be merged with addBudgetHandler to reduce DB calls?)
    const addIncomeHandler = income => {
        setTimeout(() => {
            console.log("Fetching firebase to POST...")
            fetch(`https://budget-app-c0755.firebaseio.com/income.json`, {
                method: 'PUT',
                body: JSON.stringify(income),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    setSavedIncome(income)
                    return response.json()
                })
        }, 500);
    };

    // Display budget rows on page 

    const tableRows = Object.keys(budgets).map((catKey) => {
        return <PlannerRow key={catKey} budget={budgets[catKey]} />;
    });

    console.log("RENDERING JSX")
    return (
        <>
            <div className="bg-white px-8 flex h-20 border-b border-gray-300">
                <h2 className="font-bold text-2xl block my-auto">Budget planner</h2>
            </div>

            <form className="w-full max-w-sm" >
                <div className="flex items-center border-b border-teal-500 py-2">

                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder={savedIncome.toString()}
                        aria-label="Income"
                        ref={inputRef}
                        onChange={event => {
                            setEnteredIncome(event.target.value)
                        }}
                    >
                    </input>
                </div>
            </form>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={e => {
                    addIncomeHandler(enteredIncome, e)
                    addBudgetHandler(budgets)
                }
                }>Save</button>



            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col">
                    <div className="align-middle inline-block min-w-full bg-gray-100 border-b border-gray-200">
                        <table className="min-w-full max-w-full">
                            <thead>
                                <tr>
                                    <th className="w-1/2 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                      </th>
                                    <th className="px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Percentage
                      </th>
                                    <th className="md:w-48 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Monthly
                      </th>
                                    <th className="md:w-48 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Annually
                      </th>
                                    <th className="md:w-48 px-8 py-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                      </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">{tableRows}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Planner;