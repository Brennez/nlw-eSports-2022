import * as Dialog from '@radix-ui/react-dialog';
import { Check, GameController } from 'phosphor-react';
import { Input } from './form/Input';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useEffect, useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface Game{
    id: string,
    title: string,
}

export function CreateAdModal(){

    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);

   


  useEffect(()=> {
    fetch('http://localhost:3000/games').then(response => response.json()).then(
      data => {
        setGames(data);
      }
    )
  }, [])

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
              <Dialog.Content 
              className='fixed bg-[#2A2634] py-8 px-10 
              text-white top-1/2 left-1/2 -translate-x-1/2 
              -translate-y-1/2 rounded-lg w-[480px] 
              shadow-lg shadow-black/30'>

                <Dialog.Title className='text-3xl font-black'> Publique um anúncio </Dialog.Title>

                  <form className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="game" className='font-semibold'> Qual o game?</label>
                      <select 
                        value=''
                        id='game' 
                        placeholder='Selecione qual jogo deseja jogar' 
                        className='bg-zinc-900 py-3 px-4 rounded-lg text-sm
                         placeholder:text-zinc-500 appearance-none'>

                        <option  disabled  value=""> Selecione o game que deseja jogar </option>
                        {games.map(game => {
                            return (
                            <option key={game.id} value={game.id}>{game.title}</option> 
                            )
                        })}

                       </select>
                       
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="name" className='font-semibold'>Seu nome (ou nickname)</label>
                      <Input id='game' placeholder='Como te chamam dentro do Game?'/>
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                      <div className='flex flex-col gap-2'>
                        <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                        <Input id='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO'/>
                      </div>

                      <div className='flex flex-col gap-2'>
                        <label htmlFor="discord">Qual o seu discord?</label>
                        <Input id='discord' type="text" placeholder='Usuario#0000' />
                      </div>
                    </div>

                    <div className='flex gap-6'>
                      <div className='flex flex-col gap-2'>
                        <label htmlFor="weekDays">Quando costuma jogar?</label>

                            <ToggleGroup.Root 
                                type='multiple' 
                                className='grid grid-cols-4 gap-2'
                                value={weekDays} //seta um valor padrão
                                onValueChange={setWeekDays}
                                >

                                <ToggleGroup.Item 
                                value="0" 
                                title='Domingo'  
                                className={`w-8 h-8  rounded-sm ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                    D
                                </ToggleGroup.Item >

                                <ToggleGroup.Item 
                                value="1" 
                                title='Segunda' 
                                className={`w-8 h-8  rounded-sm  ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                    S
                                </ToggleGroup.Item>

                                <ToggleGroup.Item 
                                value="2" 
                                title='Terça' 
                                className={`w-8 h-8  rounded-sm  ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                    T
                                </ToggleGroup.Item>

                                <ToggleGroup.Item 
                                value="3" 
                                title='Quarta' 
                                className={`w-8 h-8  rounded-sm  ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                    Q
                                </ToggleGroup.Item>

                                <ToggleGroup.Item 
                                value="4" 
                                title='Quinta' 
                                className={`w-8 h-8  rounded-sm ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                    Q
                                </ToggleGroup.Item>

                                <ToggleGroup.Item 
                                value="5" 
                                title='Sexta' 
                                className={`w-8 h-8  rounded-sm  ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                    S
                                </ToggleGroup.Item>

                                <ToggleGroup.Item 
                                value="6" 
                                title='Sábado'
                                className={`w-8 h-8  rounded-sm ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>


                      </div>
                      <div  className='flex flex-col gap-2 flex-1'>
                        <label htmlFor="hoursStart">Qual horário do dia?</label>
                        <div className='grid grid-cols-2 gap-2'> 
                          <Input id='hoursStart' type="time" placeholder='De' />
                          <Input id='hoursEnd' type="time" placeholder='Até'/>
                        </div>
                      </div>
                    </div>
                    <label className='mt-2 items-center flex gap-2 text-sm'>
                    <Checkbox.Root className='w-6 p-1 h-6 rounded bg-zinc-900'>
                        <Checkbox.Indicator>
                            <Check className='w-4 h-4 text-emerald-400'/>
                        </Checkbox.Indicator>
                    </Checkbox.Root>
                      Costumo me conectar ao chat de voz
                    </label>
                    <footer className='mt-4 flex justify-end gap-4'>
                      <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 
                      rounded-md font-semibold hover:bg-zinc-600'> Cancelar 
                      </Dialog.Close>

                      <button 
                        type='submit' 
                        className='bg-violet-500 px-5 h-12 rounded-md font-semibold 
                        flex items-center gap-3 hover:bg-violet-600'> 
                        <GameController className='h-6 w-6'/>
                        Encontrar duo</button>
                    </footer>
                  </form> 
            </Dialog.Content>
          </Dialog.Portal>
    )
}