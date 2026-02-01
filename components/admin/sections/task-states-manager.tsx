'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface TaskState {
  id: string
  name: string
  color: string
  description: string
}

const mockStates: TaskState[] = [
  { id: '1', name: 'Abierto', color: '#B28A12', description: 'Incidencia reportada pero no asignada' },
  { id: '2', name: 'En Proceso', color: '#D31219', description: 'Incidencia en resolución' },
  { id: '3', name: 'Pausado', color: '#6B7280', description: 'Incidencia en espera' },
  { id: '4', name: 'Resuelto', color: '#2D8A3C', description: 'Incidencia resuelta' },
  { id: '5', name: 'Cerrado', color: '#000000', description: 'Incidencia cerrada' },
]

export function TaskStatesManager() {
  const [states, setStates] = useState<TaskState[]>(mockStates)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', color: '#D31219', description: '' })

  const handleAdd = () => {
    if (editingId) {
      setStates(states.map(s => s.id === editingId ? { ...s, ...formData } : s))
      setEditingId(null)
    } else {
      setStates([...states, { id: Date.now().toString(), ...formData }])
    }
    setFormData({ name: '', color: '#D31219', description: '' })
    setOpen(false)
  }

  const handleEdit = (state: TaskState) => {
    setFormData({ name: state.name, color: state.color, description: state.description })
    setEditingId(state.id)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    setStates(states.filter(s => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Estados de Tareas</h1>
        <p className="text-muted-foreground mt-1">Gestiona los estados que pueden tener las incidencias</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Estados Disponibles</CardTitle>
            <CardDescription>{states.length} estados registrados</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => { setEditingId(null); setFormData({ name: '', color: '#D31219', description: '' }); }}
                style={{ backgroundColor: '#D31219' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Estado
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Editar Estado' : 'Nuevo Estado'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: En Proceso"
                />
                <div>
                  <label className="text-sm font-medium">Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="h-10 w-20 rounded"
                    />
                    <Input 
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    />
                  </div>
                </div>
                <Input 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripción del estado"
                />
                <Button onClick={handleAdd} className="w-full" style={{ backgroundColor: '#D31219' }}>
                  {editingId ? 'Actualizar' : 'Crear'} Estado
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {states.map((state) => (
              <div key={state.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: state.color }}
                  />
                  <div>
                    <p className="font-medium text-foreground">{state.name}</p>
                    <p className="text-sm text-muted-foreground">{state.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(state)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(state.id)}>
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
