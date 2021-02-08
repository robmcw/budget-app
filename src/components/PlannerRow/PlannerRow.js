import React from "react";
import { Link } from "react-router-dom";

const PlannerRow = (props) => {

    let catPillStyle = ""
    const cat = props.budget.category

    switch (cat) {
        case "Luxury":
            catPillStyle = "rounded-full bg-pink-600 py-1 px-1 text-white w-20 m-auto text-center"
            break;
        case "Essential":
            catPillStyle = "rounded-full bg-blue-600 py-1 px-1 text-white w-20 m-auto text-center"
            break;
        case "Savings":
            catPillStyle = "rounded-full bg-yellow-600 py-1 px-1 text-white w-20 m-auto text-center"
            break;
        default:
            catPillStyle = "rounded-full bg-blue-600 py-1 px-1 text-white w-20 m-auto text-center"
    }

    return (
        <tr className="hover:bg-gray-100 transition-all ease-linear duration-200 cursor-pointer">

            <td className="whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                <Link className="block px-8 py-4" to={`/budget/${props.budget.name}`}>
                    <div className="text-sm leading-5 text-gray-900 font-semibold">
                        {props.budget.name}
                    </div>
                </Link>
            </td>

            <td className="whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                <Link className="block px-8 py-4" to={`/budget/${props.budget.name}`}>
                    <div className="text-sm leading-5 text-gray-900 font-semibold text-center">
                        {props.budget.percentage} %
                    </div>
                </Link>
            </td>
            <td className="whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                <Link className="block px-8 py-4" to={`/budget/${props.budget.name}`}>
                    <div className="text-sm leading-5 text-gray-900 font-semibold text-center">
                        £ {props.budget.monthly}
                    </div>
                </Link>
            </td>

            <td className="whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                <Link className="block px-8 py-4" to={`/budget/${props.budget.name}`}>
                    <div className="text-sm leading-5 text-gray-900 font-semibold text-center">
                        £ {props.budget.annual}
                    </div>
                </Link>
            </td>

            <td className="border-b border-gray-200">
                <Link className="block px-8 py-4" to={`/project/${props.budget.name}`}>
                    <div className=" text-sm leading-5 text-gray-900 font-semibold">
                        <div className={catPillStyle}> {props.budget.category}
                        </div>
                    </div>
                </Link>
            </td>
        </tr>
    );
}


export default PlannerRow;