import { useState } from 'react'
import { DIVISION_TABS } from './projectImagesConfig'
import { ProjectImageListField } from './ProjectImageListField'

export function ProjectDivisionsField({ unitDivisions, onChange, onUpload }) {
  const [activeTab, setActiveTab] = useState('ground')
  const divisions = unitDivisions || { ground: [], repeated: [], roof: [] }

  const updateType = (type, images) => {
    onChange({ ...divisions, [type]: images })
  }

  const active = DIVISION_TABS.find((t) => t.key === activeTab)

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-bold text-[#1a1a2e]">صور تقسيمات الوحدات</p>
        <p className="mt-1 text-xs text-gray-500">تظهر في صفحة تفاصيل المشروع ضمن تابات أرضي / متكرر / روف</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {DIVISION_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
              activeTab === tab.key ? 'bg-[#c8a95a] text-[#0f0f1a]' : 'bg-white text-[#1a1a2e] ring-1 ring-gray-200'
            }`}
          >
            {tab.label} ({divisions[tab.key]?.length ?? 0})
          </button>
        ))}
      </div>
      <ProjectImageListField
        key={activeTab}
        label={`صور ${active?.label || activeTab}`}
        images={divisions[activeTab] || []}
        onChange={(images) => updateType(activeTab, images)}
        onUpload={(file) => onUpload(file, activeTab)}
      />
    </div>
  )
}
