import { ReactComponent as Nut } from '@/assets/icons/nut.svg';
import { ReactComponent as Person } from '@/assets/icons/person.svg';

export default function Component() {
  return (
    <header className='py-3 px-6 w-full flex flex-row justify-between border-b'>
      <span className="flex flex-row items-center">
        <Nut className="mr-2 cursor-pointer" />
      </span>
      <span>
        <Person className="rounded-full border border-slate-600 p-1 cursor-pointer" />
      </span>
    </header>
  )
}