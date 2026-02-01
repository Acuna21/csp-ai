'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface Worker {
  id: string
  name: string
  email: string
  area: string
  phone: string
}

const mockWorkers: Worker[] = [
  { id: '1', name: 'Juan Pérez', email: 'juan@universidad.edu', area: 'Infraestructura', phone: '+57 301 234 5678' },
  { id: '2', name: 'María García', email: 'maria@universidad.edu', area: 'Académica', phone: '+57 301 234 5679' },
]

export function WorkersManager() {
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', area: '', phone: '' })

  const handleAdd = () => {
    if (editingId) {
      setWorkers(workers.map(w => w.id === editingId ? { ...w, ...formData } : w))
      setEditingId(null)
    } else {
      setWorkers([...workers, { id: Date.now().toString(), ...formData }])
    }
    setFormData({ name: '', email: '', area: '', phone: '' })
    setOpen(false)
  }

  const handleEdit = (worker: Worker) => {
    setFormData(worker)
    setEditingId(worker.id)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    setWorkers(workers.filter(w => w.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Trabajadores</h1>
        <p className="text-muted-foreground mt-1">Gestiona las cuentas de los coordinadores y trabajadores</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Trabajadores Registrados</CardTitle>
            <CardDescription>{workers.length} trabajadores activos</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => { setEditingId(null); setFormData({ name: '', email: '', area: '', phone: '' }); }}
                style={{ backgroundColor: '#D31219' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Trabajador
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Editar Trabajador' : 'Nuevo Trabajador'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nombre completo"
                />
                <Input 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  type="email"
                />
                <Input 
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="Área"
                />
                <Input 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Teléfono"
                />
                <Button onClick={handleAdd} className="w-full" style={{ backgroundColor: '#D31219' }}>
                  {editingId ? 'Actualizar' : 'Crear'} Trabajador
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
                  <TableHead>Email</TableHead>
                  <TableHead>Área</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workers.map((worker) => (
                  <TableRow key={worker.id}>
                    <TableCell className="font-medium">{worker.name}</TableCell>
                    <TableCell>{worker.email}</TableCell>
                    <TableCell>{worker.area}</TableCell>
                    <TableCell>{worker.phone}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(worker)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(worker.id)}>
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
