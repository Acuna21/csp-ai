'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface Location {
  id: string
  name: string
  floor: string
  building?: string
}

const mockLocations: Location[] = [
  { id: '1', name: 'Aula 101', floor: '1', building: 'Edificio A' },
  { id: '2', name: 'Laboratorio de Informática', floor: '2', building: 'Edificio B' },
  { id: '3', name: 'Biblioteca', floor: '1', building: 'Edificio A' },
]

export function LocationsManager() {
  const [locations, setLocations] = useState<Location[]>(mockLocations)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', floor: '', building: '' })

  const handleAdd = () => {
    if (editingId) {
      setLocations(locations.map(loc => loc.id === editingId ? { ...loc, ...formData } : loc))
      setEditingId(null)
    } else {
      setLocations([...locations, { id: Date.now().toString(), ...formData }])
    }
    setFormData({ name: '', floor: '', building: '' })
    setOpen(false)
  }

  const handleEdit = (location: Location) => {
    setFormData({ name: location.name, floor: location.floor, building: location.building || '' })
    setEditingId(location.id)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Sitios y Lugares</h1>
        <p className="text-muted-foreground mt-1">Gestiona los sitios donde se reportan incidencias</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Ubicaciones Registradas</CardTitle>
            <CardDescription>{locations.length} sitios disponibles</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => { setEditingId(null); setFormData({ name: '', floor: '', building: '' }); }}
                style={{ backgroundColor: '#D31219' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Sitio
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Editar Sitio' : 'Nuevo Sitio'}</DialogTitle>
                <DialogDescription>
                  {editingId ? 'Actualiza los datos del sitio' : 'Crea un nuevo sitio en el sistema'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nombre del Sitio</label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Aula 301"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Piso</label>
                  <Input 
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    placeholder="Ej: 3"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Edificio (Opcional)</label>
                  <Input 
                    value={formData.building}
                    onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                    placeholder="Ej: Edificio Principal"
                  />
                </div>
                <Button onClick={handleAdd} className="w-full" style={{ backgroundColor: '#D31219' }}>
                  {editingId ? 'Actualizar' : 'Crear'} Sitio
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Piso</TableHead>
                  <TableHead>Edificio</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell className="font-medium">{location.name}</TableCell>
                    <TableCell>{location.floor}</TableCell>
                    <TableCell>{location.building || '-'}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleEdit(location)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDelete(location.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
