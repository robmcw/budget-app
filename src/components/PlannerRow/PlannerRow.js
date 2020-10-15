import React from "react";
import { Link } from "react-router-dom";

const PlannerRow = (props) => {
    return (
        <tr className="hover:bg-gray-100 transition-all ease-linear duration-200 cursor-pointer">

            <td className="w-1/2 whitespace-no-wrap border-b border-gray-200">
                <Link className="block px-8 py-4" to={`/budget/${props.budget.name}`}>
                    <div className="text-sm leading-5 text-gray-900 font-semibold">
                        {props.budget.name}
                    </div>
                </Link>
            </td>

            <td className="w-1/2 whitespace-no-wrap border-b border-gray-200">
                <Link className="block px-8 py-4" to={`/budget/${props.budget.name}`}>
                    <div className="text-sm leading-5 text-gray-900 font-semibold">
                        {props.budget.percentage}
                    </div>
                </Link>
            </td>
            <td className="whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                <Link className="block px-8 py-4" to={`/budget/${props.budget.name}`}>
                    <div className="text-sm leading-5 text-gray-900 font-semibold">
                        {props.budget.monthly}
                    </div>
                </Link>
            </td>

            <td className="whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                <Link className="block px-8 py-4" to={`/budget/${props.budget.name}`}>
                    <div className="text-sm leading-5 text-gray-900 font-semibold">
                        {props.budget.annual}
                    </div>
                </Link>
            </td>

            <td className="border-b border-gray-200">
                <Link className="block px-8 py-4" to={`/project/${props.budget.name}`}>
                    <div className="text-sm leading-5 text-gray-900 font-semibold">
                        {props.budget.category}
                    </div>
                </Link>
            </td>
        </tr>
    );
}


export default PlannerRow;