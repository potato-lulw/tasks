// components/Card.jsx
import React from "react";


const MyCard = ({ icon, bg, label, count, text }) => {

    return (
        <div className={`rounded-xl  text-white shadow-md bg-background flex items-center justify-between cursor-pointer`}>
            <div className="flex items-center space-x-3 h-full">
                <div className={`${bg} h-full p-3 items-center flex rounded-l-xl`}>{icon}</div>
                <div className="p-3 flex-1">
                    <p className={`${text} text-sm font-extrabold rounded-full p-2 py-1 bg-secondary `}>{label}</p>
                    <p className="text-xl text-primary font-bold">{count}</p>
                    <p className="text-gray-400">100 last month</p>
                </div>
            </div>
        </div>
    );
};

export default MyCard;
