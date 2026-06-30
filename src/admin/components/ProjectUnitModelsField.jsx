import { useState } from 'react'
import { BilingualInput } from './AdminUI'

export const emptyUnitModel = () => ({
  name: { ar: '', en: '' },
  area: { ar: '', en: '' },
  extra: { ar: '', en: '' },
  status: { ar: 'تحت الإنشاء', en: 'Under construction' },
  rooms: [],
})

const MODEL_TYPE_OPTIONS = [
  { key: 'ground', label: 'أرضي', prefix: { ar: 'نموذج أرضي', en: 'Ground model' } },
  { key: 'repeated', label: 'متكرر', prefix: { ar: 'نموذج متكرر', en: 'Repeated model' } },
  { key: 'roof', label: 'روف', prefix: { ar: 'نموذج روف', en: 'Roof model' } },
]

function UnitModelCard({ unit, index, onChange, onRemove }) {
  const [open, setOpen] = useState(true)
  const [roomAr, setRoomAr] = useState('')
  const [roomEn, setRoomEn] = useState('')
  const [roomDim, setRoomDim] = useState('')

  const update = (patch) => onChange({ ...unit, ...patch })

  const addRoom = () => {
    if (!roomAr.trim() && !roomEn.trim()) return
    const room = { name: { ar: roomAr, en: roomEn } }
    if (roomDim.trim()) room.dim = roomDim.trim()
    update({ rooms: [...(unit.rooms || []), room] })
    setRoomAr('')
    setRoomEn('')
    setRoomDim('')
  }

  const removeRoom = (roomIndex) => {
    update({ rooms: (unit.rooms || []).filter((_, i) => i !== roomIndex) })
  }

  const applyType = (option) => {
    const suffix = unit.name?.ar?.replace(/^نموذج (أرضي|متكرر|روف)\s*[–-]?\s*/u, '').trim()
    const suffixEn = unit.name?.en?.replace(/^(Ground|Repeated|Roof) model\s*[–-]?\s*/i, '').trim()
    update({
      name: {
        ar: suffix ? `${option.prefix.ar} – ${suffix}` : option.prefix.ar,
        en: suffixEn ? `${option.prefix.en} – ${suffixEn}` : option.prefix.en,
      },
    })
  }

  const title = unit.name?.ar || unit.name?.en || `نموذج ${index + 1}`

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/80">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-start"
      >
        <span className="text-sm font-bold text-[#1a1a2e]">{title}</span>
        <span className="text-xs text-gray-500">{open ? 'إخفاء' : 'عرض'}</span>
      </button>

      {open && (
        <div className="space-y-4 border-t border-gray-200 px-4 pb-4 pt-3">
          <div className="flex flex-wrap gap-2">
            {MODEL_TYPE_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => applyType(option)}
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#1a1a2e] ring-1 ring-gray-200 hover:ring-[#c8a95a]"
              >
                {option.label}
              </button>
            ))}
          </div>

          <BilingualInput label="اسم النموذج" value={unit.name} onChange={(name) => update({ name })} />
          <BilingualInput label="المساحة" value={unit.area} onChange={(area) => update({ area })} />
          <BilingualInput label="معلومة إضافية (جاردن / تراس)" value={unit.extra} onChange={(extra) => update({ extra })} />
          <BilingualInput label="حالة النموذج" value={unit.status} onChange={(status) => update({ status })} />

          <div className="space-y-3">
            <p className="text-sm font-bold text-[#1a1a2e]">الغرف والمساحات</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                value={roomAr}
                onChange={(e) => setRoomAr(e.target.value)}
                placeholder="غرفة بالعربي"
                className="admin-input"
              />
              <input
                value={roomEn}
                onChange={(e) => setRoomEn(e.target.value)}
                placeholder="Room in English"
                className="admin-input"
                dir="ltr"
              />
              <input
                value={roomDim}
                onChange={(e) => setRoomDim(e.target.value)}
                placeholder="الأبعاد (اختياري)"
                className="admin-input"
                dir="ltr"
              />
            </div>
            <button type="button" onClick={addRoom} className="admin-btn-secondary">
              إضافة غرفة
            </button>
            <ul className="space-y-2">
              {(unit.rooms || []).map((room, roomIndex) => (
                <li
                  key={roomIndex}
                  className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-gray-100"
                >
                  <span>
                    {room.name?.ar || room.name?.en}
                    {room.dim ? ` · ${room.dim}` : ''}
                    {room.name?.en && room.name?.ar ? ` / ${room.name.en}` : ''}
                  </span>
                  <button type="button" onClick={() => removeRoom(roomIndex)} className="text-red-500">
                    حذف
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button type="button" onClick={onRemove} className="admin-btn-danger !px-3 !py-1.5">
            حذف النموذج
          </button>
        </div>
      )}
    </div>
  )
}

export function ProjectUnitModelsField({ unitDetails = [], onChange }) {
  const models = Array.isArray(unitDetails) ? unitDetails : []

  const updateModel = (index, next) => {
    onChange(models.map((item, i) => (i === index ? next : item)))
  }

  const removeModel = (index) => {
    onChange(models.filter((_, i) => i !== index))
  }

  const addModel = () => {
    onChange([...models, emptyUnitModel()])
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-lg font-bold text-[#1a1a2e]">النماذج</p>
        <p className="mt-1 text-xs text-gray-500">
          تفاصيل نماذج الوحدات (أرضي / متكرر / روف) كما تظهر في صفحة المشروع ضمن قسم النماذج.
        </p>
      </div>

      {models.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-500">
          لا توجد نماذج بعد. أضف نموذجاً لعرض تفاصيل الوحدات في الموقع.
        </p>
      ) : (
        <div className="space-y-3">
          {models.map((unit, index) => (
            <UnitModelCard
              key={index}
              unit={unit}
              index={index}
              onChange={(next) => updateModel(index, next)}
              onRemove={() => removeModel(index)}
            />
          ))}
        </div>
      )}

      <button type="button" onClick={addModel} className="admin-btn-secondary">
        + إضافة نموذج
      </button>
    </div>
  )
}
