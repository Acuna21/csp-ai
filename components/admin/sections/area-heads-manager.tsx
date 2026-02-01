'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface AreaHead {
  id: string
  area: string
  worker: string
}

const mockAreaHeads: AreaHead[] = [
  { id: '1', area: 'Infraestructura', worker: 'Juan Pérez' },
  { id: '2', area: 'Académica', worker: 'María García' },
]

const areas = ['Infraestructura', 'Académica', 'Administrativo']
const workers = ['Juan Pérez', 'María García', 'Pedro López']

export function AreaHeadsManager() {
  const [heads, setHeads] = useState<AreaHead[]>(mockAreaHeads)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ area: '', worker: '' })

  const handleAdd = () => {
    if (editingId) {
      setHeads(heads.map(h => h.id === editingId ? { ...h, ...formData } : h))
      setEditingId(null)
    } else {
      setHeads([...heads, { id: Date.now().toString(), ...formData }])
    }
    setFormData({ area: '', worker: '' })
    setOpen(false)
  }

  const handleEdit = (head: AreaHead) => {
    setFormData({ area: head.area, worker: head.worker })
    setEditingId(head.id)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    setHeads(heads.filter(h => h.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Jefes de Áreas</h1>
        <p className="text-muted-foreground mt-1">Asigna jefes responsables a cada área</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Asignaciones</CardTitle>
            <CardDescription>{heads.length} áreas con jefe asignado</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => { setEditingId(null); setFormData({ area: '', worker: '' }); }}
                style={{ backgroundColor: '#D31219' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Asignar Jefe
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Editar Asignación' : 'Nueva Asignación'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Área</label>
                  <Select value={formData.area} onValueChange={(v) => setFormData({ ...formData, area: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un área" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map(a => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Trabajador</label>
                  <Select value={formData.worker} onValueChange={(v) => setFormData({ ...formData, worker: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un trabajador" />
                    </SelectTrigger>
                    <SelectContent>
                      {workers.map(w => (
                        <SelectItem key={w} value={w}>{w}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAdd} className="w-full" style={{ backgroundColor: '#D31219' }}>
                  {editingId ? 'Actualizar' : 'Crear'} Asignación
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {heads.map((head) => (
              <div key={head.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{head.area}</p>
                  <p className="text-sm text-muted-foreground">Jefe: {head.worker}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(head)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(head.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
