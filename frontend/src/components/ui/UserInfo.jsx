import { getInitials } from '@/utils/utils';
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const UserInfo = ({ name, title, email, index }) => {
    const bgColors = ["#f0766e", "#facc15", "#1d4ed8"];
    const colorClass = bgColors[index % bgColors.length];
    // console.log(name)
    return (
        <Popover >
            <PopoverTrigger>
                <div
                    className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm bg-[${colorClass}]`}
                    title={title}
                >


                    {getInitials(name)}
                </div>
            </PopoverTrigger>
            <PopoverContent className="bg-secondary w-fit ">
                <div className="flex flex-row gap-2 items-center w-fit">
                    <div className="flex items-center">
                        <div
                            className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm"
                            style={{ backgroundColor: colorClass }}
                            title={title}
                        >
                            {getInitials(name)}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-start">
                        <p className="font-medium">{name}</p>
                        <p className="text-gray-500 text-sm">{title}</p>
                        <p className="text-gray-500 text-sm">{email}</p>
                    </div>
                </div>
            </PopoverContent>


        </Popover >


    )
}

export default UserInfo