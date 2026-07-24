

export const SearchBar = () => {
    return (
        <div className='hidden md:flex items-center flex-1 max-w-lg'>

            <div className='relative flex items-center border border-black/20 rounded-xl  flex-1 pl-2 '><input type="text" placeholder='what skill are you aiming for? ' className='h-10 w-full mx-2 outline-none placeholder:font-light placeholder:text-sm placeholder:text-gray-500 focus:placeholder-opacity-0 transition-all duration-300 ' />
                {/* <label htmlFor="" className='absolute pl-2 peer-focus:scale-0 placeholder-gray-500 transition-all duration-300 focus:placeholder-opacity-0 outline-none  text-sm  font-light text-gray-500'>what skill are you aiming for?</label> */}
                <span className="material-symbols-outlined mr-5 cursor-pointer">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.25 20.5C4.6 20.5 0 15.9 0 10.25C0 4.6 4.6 0 10.25 0C15.9 0 20.5 4.6 20.5 10.25C20.5 15.9 15.9 20.5 10.25 20.5ZM10.25 1.5C5.42 1.5 1.5 5.43 1.5 10.25C1.5 15.07 5.42 19 10.25 19C15.08 19 19 15.07 19 10.25C19 5.43 15.08 1.5 10.25 1.5Z" fill="#1D1073" />
                        <path d="M20.7495 21.4999C20.5595 21.4999 20.3695 21.4299 20.2195 21.2799L18.2195 19.2799C17.9295 18.9899 17.9295 18.5099 18.2195 18.2199C18.5095 17.9299 18.9895 17.9299 19.2795 18.2199L21.2795 20.2199C21.5695 20.5099 21.5695 20.9899 21.2795 21.2799C21.1295 21.4299 20.9395 21.4999 20.7495 21.4999Z" fill="#1D1073" />
                    </svg>
                </span>
            </div>

        </div>
    )
}
