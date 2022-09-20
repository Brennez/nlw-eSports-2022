import * as Dialog  from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";

export function AdBanner(){
    return (
        <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8'> 
        <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
          <div>
               <strong className='text-2xl font-black text-white block'>Não encontrou seu duo?</strong>
               <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
          </div>

          <Dialog.Trigger className='px-3 py-4 bg-violet-500 rounded hover:bg-violet-600 text-white flex items-center gap-3'>
            Publicar anúncio
            <MagnifyingGlassPlus size={24}/>
          </Dialog.Trigger>
        </div>  
    </div> 
    )
}