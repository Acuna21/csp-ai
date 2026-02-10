'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Trash2 } from 'lucide-react'

interface Tag {
  id: string
  name: string
  color: string
}

const mockTags: Tag[] = [
  { id: '1', name: 'Urgente', color: '#D31219' },
  { id: '2', name: 'Mantenimiento', color: '#B28A12' },
  { id: '3', name: 'Infraestructura', color: '#2D8A3C' },
  { id: '4', name: 'Académico', color: '#6B7280' },
]

export function TagsManager() {
  const [tags, setTags] = useState<Tag[]>(mockTags)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', color: '#D31219' })

  const handleAdd = () => {
    setTags([...tags, { id: Date.now().toString(), ...formData }])
    setFormData({ name: '', color: '#D31219' })
    setOpen(false)
  }

  const handleDelete = (id: string) => {
    setTags(tags.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tags</h1>
        <p className="text-muted-foreground mt-1">Gestiona las etiquetas disponibles para clasificar incidencias</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Tags Disponibles</CardTitle>
            <CardDescription>{tags.length} tags registrados</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => setFormData({ name: '', color: '#D31219' })}
                style={{ backgroundColor: '#D31219' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Tag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nuevo Tag</DialogTitle>
                <DialogDescription>Crea una nueva etiqueta para clasificar incidencias</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nombre</label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Urgente"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="h-10 w-20 rounded cursor-pointer"
                    />
                    <Input 
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="#D31219"
                    />
                  </div>
                </div>
                <Button onClick={handleAdd} className="w-full" style={{ backgroundColor: '#D31219' }}>
                  Crear Tag
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center gap-2">
                <Badge style={{ backgroundColor: tag.color, color: '#fff' }}>
                  {tag.name}
                </Badge>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleDelete(tag.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
