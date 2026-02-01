'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface Criticality {
  id: string
  name: string
  level: number
  color: string
  description: string
}

const mockCriticalities: Criticality[] = [
  { id: '1', name: 'Baja', level: 1, color: '#2D8A3C', description: 'Problema menor sin impacto operativo' },
  { id: '2', name: 'Media', level: 2, color: '#B28A12', description: 'Problema moderado con impacto limitado' },
  { id: '3', name: 'Alta', level: 3, color: '#D31219', description: 'Problema grave que requiere atención urgente' },
]

export function CriticalityManager() {
  const [criticalities, setCriticalities] = useState<Criticality[]>(mockCriticalities)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', level: 1, color: '#D31219', description: '' })

  const handleAdd = () => {
    if (editingId) {
      setCriticalities(criticalities.map(c => c.id === editingId ? { ...c, ...formData, level: parseInt(formData.level.toString()) } : c))
      setEditingId(null)
    } else {
      setCriticalities([...criticalities, { id: Date.now().toString(), ...formData, level: parseInt(formData.level.toString()) }])
    }
    setFormData({ name: '', level: 1, color: '#D31219', description: '' })
    setOpen(false)
  }

  const handleEdit = (crit: Criticality) => {
    setFormData({ name: crit.name, level: crit.level, color: crit.color, description: crit.description })
    setEditingId(crit.id)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    setCriticalities(criticalities.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Niveles de Criticidad</h1>
        <p className="text-muted-foreground mt-1">Gestiona los niveles de criticidad de las incidencias</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Criticidades Registradas</CardTitle>
            <CardDescription>{criticalities.length} niveles disponibles</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => { setEditingId(null); setFormData({ name: '', level: 1, color: '#D31219', description: '' }); }}
                style={{ backgroundColor: '#D31219' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Criticidad
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Editar Criticidad' : 'Nueva Criticidad'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Alta"
                />
                <div>
                  <label className="text-sm font-medium">Nivel (1-5)</label>
                  <Input 
                    type="number"
                    min="1"
                    max="5"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  />
                </div>
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
                  placeholder="Descripción"
                />
                <Button onClick={handleAdd} className="w-full" style={{ backgroundColor: '#D31219' }}>
                  {editingId ? 'Actualizar' : 'Crear'} Criticidad
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {criticalities.map((crit) => (
              <div key={crit.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: crit.color }}
                  />
                  <div>
                    <p className="font-medium text-foreground">{crit.name}</p>
                    <p className="text-sm text-muted-foreground">{crit.description}</p>
                    <p className="text-xs text-muted-foreground">Nivel: {crit.level}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(crit)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(crit.id)}>
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
