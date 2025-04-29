    import React from 'react';
    import clsx from 'clsx';

    const Textbox = ({
        label,
        type = 'text',
        name,
        placeholder,
        register,
        error,
        classNames = '',
    }) => {
        return (
            <div className="w-full my-8">

                <div className='border border-border rounded-full relative mt-5 wave-particles'>
                    {label && (
                        <label htmlFor={name} className="block text-sm font-medium mb-1 absolute bg-background -top-6 translate-y-1/2 left-5 px-2 z-10 dark:text-gray-400 text-gray-600">
                            {label}
                        </label>
                    )}
                    <input
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        {...register}
                        className={ clsx("outline-none focus:outline-none w-full rounded-full px-4 py-4  focus:ring-[2px] focus:ring-gray-400 " +  {classNames})}
                        aria-invalid={error? "true": "false"}
                    />
                </div>
                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            </div>
        );
    };

    export default Textbox;
