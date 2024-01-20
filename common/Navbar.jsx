import Link from 'next/link';
import Image from 'next/image';

export default function Component() {
  return (
    <nav className="border-r px-2">
      <Link href={'/to-do'}>
        <Image src='/icons/check2circle.svg' alt='tool logo' className='hover:bg-green-200 fill-green-700 bg-green-100 rounded-md my-2 p-2' width={40} height={40} />
      </Link>
      <Link href={'/to-do'}>
        <Image src='/icons/check2circle.svg' alt='tool logo' className='hover:bg-indigo-200 fill-green-700 bg-indigo-100 rounded-md my-2 p-2' width={40} height={40} />
      </Link>
    </nav>
  )
}