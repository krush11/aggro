import Image from "next/image"
import { toast } from "react-toastify"

export default function ToolOnboarding({ user, tool, setOnboardingTool }) {
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOnboardingTool(null) })

  async function addTool() {
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool })
      })
      const data = await res.json()
      switch (res.status) {
        case 200:
          toast.success(`Tool added successfully. Redirecting to ${tool.name} app`)
          setTimeout(() => { window.location.href = `/${tool.codename}` }, 2000)
          break;
        case 400:
          if (data == 'already added')
            toast.error('Tool already added')
          else
            toast.error('Invalid request')
          break;
        case 404:
          toast.error('Tool not found')
          break;
        case 500:
          toast.error('Server error')
          break;
        default:
          toast.error('Something went wrong. Please try again later.')
          break;
      }
    } catch (err) {
      toast.error('Error adding tool')
    }
  }

  return (
    <div className="fixed transition-all duration-500 top-1/2 left-1/2 h-full w-full transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm">
      <div className="absolute flex flex-col p-4 w-1/2 h-1/2 bg-white rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image src='/icons/x.svg' width={32} height={32} alt="close-popup" onClick={() => setOnboardingTool(null)}
          className="absolute right-4 hover:bg-neutral-200 rounded-md cursor-pointer" />
        <div className="flex flex-row border-b">
          <Image src={'/icons/tools/' + tool.codename + '.svg'} alt={tool.name} width={28} height={28} />
          <h1 className="text-2xl font-bold py-2 ml-2">{tool.name} App</h1>
        </div>
        <div className="flex-auto flex flex-col justify-between">
          <div className="py-2 overflow-y-scroll">
            <p className="text-sm">{tool.description}</p>
          </div>
          {user.ToolUsers.some(x => x.tool.id == tool.id) ?
            <a href={`/${tool.codename}`}
              className="uppercase text-sm border bg-green-400 hover:bg-green-500 rounded-md py-2 transition-all flex flex-row justify-center items-center">
              Go to app&nbsp;&nbsp;<Image src='/icons/boxArrowUpRight.svg' width={16} height={16} alt="go to app" />
            </a> :
            <button className="uppercase text-sm border bg-green-400 hover:bg-green-500 rounded-md py-2 transition-all" onClick={() => addTool()}>
              Start using this tool
            </button>
          }
        </div>
      </div>
    </div>
  )
}