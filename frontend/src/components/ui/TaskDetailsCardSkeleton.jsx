import React from 'react'

const TaskDetailsCardSkeleton = () => {

    return (
        <div class="bg-background rounded-xl flex flex-col items-start justify-between gap-2 p-3 border border-border animate-pulse">
            
            <div class='flex flex-col gap-2 max-h-[85px] w-full'>
                <div class='flex items-center justify-between w-full text-xs'>
                    <div class='flex items-center gap-2'>
                        <div class='w-4 h-4 bg-gray-300 rounded-full'></div>
                        <div class='w-16 h-3 bg-gray-300 rounded'></div>
                    </div>
                    <div class='w-4 h-4 bg-gray-300 rounded'></div>
                </div>
                <div class='flex items-center gap-2'>
                    <div class='w-4 h-4 rounded-full bg-gray-300'></div>
                    <div class='w-3/4 h-4 bg-gray-300 rounded'></div>
                </div>
                <div class='border-b border-border pb-2 w-full'>
                    <div class='w-24 h-3 bg-gray-300 rounded'></div>
                </div>
            </div>
            
            <div class='w-full'>
                <div class="flex justify-between items-center pt-1 w-full">
                    <div class="flex gap-4 items-center text-sm">
                        <div class="flex items-center gap-1">
                            <div class='w-4 h-4 bg-gray-300 rounded'></div>
                            <div class='w-4 h-3 bg-gray-300 rounded'></div>
                        </div>
                        <div class="flex items-center gap-1">
                            <div class='w-4 h-4 bg-gray-300 rounded'></div>
                            <div class='w-4 h-3 bg-gray-300 rounded'></div>
                        </div>
                        <div class="flex items-center gap-1">
                            <div class='w-4 h-4 bg-gray-300 rounded'></div>
                            <div class='w-4 h-3 bg-gray-300 rounded'></div>
                        </div>
                    </div>
                    <div class="flex -space-x-2">
                        <div class="w-8 h-8 rounded-full bg-gray-300 border border-white"></div>
                        <div class="w-8 h-8 rounded-full bg-gray-300 border border-white"></div>
                        <div class="w-8 h-8 rounded-full bg-gray-300 border border-white"></div>
                    </div>
                </div>
            </div>
            
            <div class='w-full max-h-[100px] overflow-auto flex flex-col gap-2'>
                <div class='flex flex-col gap-1 w-full'>
                    <div class='w-3/4 h-4 bg-gray-300 rounded'></div>
                    <div class='flex items-center gap-2'>
                        <div class='w-20 h-3 bg-gray-300 rounded'></div>
                        <div class='w-16 h-5 bg-gray-300 rounded-full'></div>
                    </div>
                </div>
                <div class='flex flex-col gap-1 w-full'>
                    <div class='w-3/4 h-4 bg-gray-300 rounded'></div>
                    <div class='flex items-center gap-2'>
                        <div class='w-20 h-3 bg-gray-300 rounded'></div>
                        <div class='w-16 h-5 bg-gray-300 rounded-full'></div>
                    </div>
                </div>
            </div>
            
            <div class='w-full'>
                <div class='w-32 h-8 bg-gray-300 rounded-md'></div>
            </div>
        </div>
    );



}

export default TaskDetailsCardSkeleton