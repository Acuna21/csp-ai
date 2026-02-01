'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface Area {
  id: string
  name: string
  description: string
}

const mockAreas: Area[] = [
  { id: '1', name: 'Infraestructura', description: 'Problemas de instalaciones y equipos' },
  { id: '2', name: 'Académica', description: 'Asuntos relacionados con calificaciones y matrículas' },
  { id: '3', name: 'Administrativo', description: 'Trámites administrativos y documentación' },
]

export function AreasManager() {
  const [areas, setAreas] = useState<Area[]>(mockAreas)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '' })

  const handleAdd = () => {
    if (editingId) {
      setAreas(areas.map(area => area.id === editingId ? { ...area, ...formData } : area))
      setEditingId(null)
    } else {
      setAreas([...areas, { id: Date.now().toString(), ...formData }])
    }
    setFormData({ name: '', description: '' })
    setOpen(false)
  }

  const handleEdit = (area: Area) => {
    setFormData({ name: area.name, description: area.description })
    setEditingId(area.id)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    setAreas(areas.filter(area => area.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Áreas</h1>
        <p className="text-muted-foreground mt-1">Gestiona las áreas responsables de las incidencias</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Áreas Registradas</CardTitle>
            <CardDescription>{areas.length} áreas disponibles</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => { setEditingId(null); setFormData({ name: '', description: '' }); }}
                style={{ backgroundColor: '#D31219' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Área
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Editar Área' : 'Nueva Área'}</DialogTitle>
                <DialogDescription>
                  {editingId ? 'Actualiza los datos del área' : 'Crea una nueva área en el sistema'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nombre del Área</label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Infraestructura"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Descripción</label>
                  <Input 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descripción del área"
                  />
                </div>
                <Button onClick={handleAdd} className="w-full" style={{ backgroundColor: '#D31219' }}>
                  {editingId ? 'Actualizar' : 'Crear'} Área
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {areas.map((area) => (
              <div key={area.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{area.name}</p>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleEdit(area)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleDelete(area.id)}
                  >
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
