import { FC } from 'react'

interface HeaderProps {

}

const Header: FC<HeaderProps> = ({ }) => {
    return (
        <header className='text-center w-full h-1 '>
            <h1 className='h-fit text-2xl font-bold mt-4 capitalize text-zinc-700'>Streaming App</h1>
        </header>
    )
}

export default Header