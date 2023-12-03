import Link from 'next/link';
import { ReactComponent as Check2Circle } from '@/assets/icons/check2circle.svg';
import { ReactComponent as Nut } from '@/assets/icons/nut.svg';

export default function Component() {
  return (
    <nav className="border-r px-4">
      <Link href={'/to-do'}>
        <Check2Circle />
      </Link>
      <Link href={'/to-do'}>
        <Nut />
      </Link>
    </nav>
  )
}