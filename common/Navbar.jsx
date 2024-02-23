import Link from 'next/link';
import Image from 'next/image';
import { getUser } from '@/utils/getUser';

async function fetchUserTools() {
  const userTools = await getUser();
  const tools = userTools.ToolUsers.map(x => x.tool)

  return tools;
}

export default async function Component() {
  const tools = await fetchUserTools();

  return (
    <nav className="border-r px-2">
      <Link href='/' className='relative flex flex-row'>
        <Image src={`/icons/house.svg`} alt='dashboard' className='z-30 peer hover:bg-violet-300 bg-violet-200 rounded-md my-2 p-2' width={40} height={40} />
        <div className='z-20 invisible absolute my-2 p-2 left-4 peer-hover:visible peer-hover:left-8 peer-hover:transition-all rounded-e-md bg-violet-300'>Dashboard</div>
      </Link>
      {tools.map(tool => (
        <Link href={`/${tool.codename}`} key={tool.id} className='relative flex flex-row'>
          <Image src={`/icons/tools/${tool.codename}.svg`} alt={tool.name} className='z-30 peer hover:bg-green-300 bg-green-200 rounded-md my-2 p-2' width={40} height={40} />
          <div className='z-20 w-max invisible absolute my-2 p-2 left-4 peer-hover:visible peer-hover:left-8 peer-hover:transition-all rounded-e-md bg-green-300'>{tool.name}</div>
        </Link>
      ))}
    </nav>
  )
}