import React from "react";

const LoadingCard = () => {
    return (
        <React.Fragment >
            <div className="mx-8 my-4 px-8 py-32 border-gray-300 border rounded shadow">
                <div className="animate-pulse" >
                    <div className="flex h-4 w-1/2 rounded-sm bg-blue-200"> </div>
                    <div class="flex-1 space-y-4 py-3"> </div>
                    <div className="flex h-4 w-full rounded-sm bg-blue-200"> </div>
                    <div class="flex-1 space-y-4 py-3"> </div>
                    <div className="flex h-4 w-full rounded-sm bg-blue-200"> </div>
                    <div class="flex-1 space-y-4 py-3"> </div>
                    <div className="flex h-4 w-full rounded-sm bg-blue-200"> </div>
                    <div class="flex-1 space-y-4 py-3"> </div>
                    <div className="flex  h-4 w-full rounded-sm bg-blue-200"> </div>
                </div>
            </div>

            <div className="mx-8 my-4 px-32 py-32 border-gray-300 border rounded shadow">
                <div className="animate-pulse" >
                    <div className="flex h-4 w-1/2 rounded-sm bg-blue-200"> </div>
                    <div class="flex-1 space-y-4 py-3"> </div>
                    <div className="flex h-4 w-full rounded-sm bg-blue-200"> </div>
                    <div class="flex-1 space-y-4 py-3"> </div>
                    <div className="flex h-4 w-full rounded-sm bg-blue-200"> </div>
                    <div class="flex-1 space-y-4 py-3"> </div>
                    <div className="flex h-4 w-full rounded-sm bg-blue-200"> </div>
                    <div class="flex-1 space-y-4 py-3"> </div>
                    <div className="flex  h-4 w-full rounded-sm bg-blue-200"> </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default LoadingCard;