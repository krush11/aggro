'use client'

import ToolOnboarding from "@/common/ToolOnboarding";
import Image from "next/image";
import { useState } from "react";

export default function Client({ user, tools }) {
  const [onboardingTool, setOnboardingTool] = useState(null)

  return (
    <div className="relative p-4">
      {onboardingTool && <ToolOnboarding user={user} tool={onboardingTool} setOnboardingTool={setOnboardingTool} />}
      <h1 className="text-2xl mb-4">Which tool can we help you with today?</h1>
      <div className="grid grid-cols-6 gap-4 max-[1600px]:grid-cols-6">
        {tools.map((tool, index) => (
          <a key={index} className={`p-4 flex flex-col justify-between border rounded-md cursor-pointer transition-all hover:shadow-md`}
            style={{ backgroundColor: tool.primaryColor }} onClick={() => setOnboardingTool(tool)} >
            <div>
              <span className="flex flex-row items-center justify-between mb-2">
                <h2 className="text-lg uppercase">{tool.name}</h2>
                <Image src={'/icons/tools/' + tool.codename + '.svg'} alt={tool.name} width={28} height={28} />
              </span>
              <p className="text-sm text-neutral-600 line-clamp-2">{tool.description}</p>
            </div>
            <span className="mt-4 flex flex-row justify-between items-center">
              <span className="flex flex-row">
                <Image src='/icons/person.svg' alt="users" width={18} height={18} className="mr-1" />
                {tool.ToolUsers.length}
              </span>
              {user.ToolUsers.some(x => x.tool.id == tool.id) &&
                <Image src='/icons/check2.svg' width={24} height={24} alt="tool already added" />}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}