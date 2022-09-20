import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

// Ele herda todas as propriedade de um Input em um Html convencional
export function Input(props: InputProps){
    return (
        <input 
            {...props}
            className='bg-zinc-900 py-3 px-4 rounded-lg text-sm placeholder:text-zinc-500'
        />
    )
}