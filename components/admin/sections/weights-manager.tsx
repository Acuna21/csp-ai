'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

interface Weight {
  id: string
  factor: string
  value: number
  description: string
}

const mockWeights: Weight[] = [
  { id: '1', factor: 'Daño Material', value: 3, description: 'Afecta infraestructura o equipos' },
  { id: '2', factor: 'Tiempo de Respuesta', value: 5, description: 'Requiere atención inmediata' },
  { id: '3', factor: 'Número de Afectados', value: 4, description: 'Impacta múltiples usuarios' },
  { id: '4', factor: 'Seguridad', value: 5, description: 'Representa un riesgo de seguridad' },
]

export function WeightsManager() {
  const [weights, setWeights] = useState<Weight[]>(mockWeights)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ factor: '', value: 1, description: '' })

  const handleAdd = () => {
    if (editingId) {
      setWeights(weights.map(w => w.id === editingId ? { ...w, ...formData } : w))
      setEditingId(null)
    } else {
      setWeights([...weights, { id: Date.now().toString(), ...formData }])
    }
    setFormData({ factor: '', value: 1, description: '' })
    setOpen(false)
  }

  const handleEdit = (weight: Weight) => {
    setFormData({ factor: weight.factor, value: weight.value, description: weight.description })
    setEditingId(weight.id)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    setWeights(weights.filter(w => w.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pesos de Incidencias</h1>
        <p className="text-muted-foreground mt-1">Configura los factores de peso para calcular la complejidad de las incidencias</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Factores de Complejidad</CardTitle>
            <CardDescription>{weights.length} factores configurados</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => { setEditingId(null); setFormData({ factor: '', value: 1, description: '' }); }}
                style={{ backgroundColor: '#D31219' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Factor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Editar Factor' : 'Nuevo Factor'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input 
                  value={formData.factor}
                  onChange={(e) => setFormData({ ...formData, factor: e.target.value })}
                  placeholder="Ej: Daño Material"
                />
                <div>
                  <label className="text-sm font-medium">Peso ({formData.value}/10)</label>
                  <Slider
                    value={[formData.value]}
                    onValueChange={(v) => setFormData({ ...formData, value: v[0] })}
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>
                <Input 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripción del factor"
                />
                <Button onClick={handleAdd} className="w-full" style={{ backgroundColor: '#D31219' }}>
                  {editingId ? 'Actualizar' : 'Crear'} Factor
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
                  <TableHead>Factor</TableHead>
                  <TableHead>Peso</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weights.map((weight) => (
                  <TableRow key={weight.id}>
                    <TableCell className="font-medium">{weight.factor}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                          <div 
                            className="h-full transition-all"
                            style={{ 
                              width: `${(weight.value / 10) * 100}%`,
                              backgroundColor: weight.value >= 8 ? '#D31219' : weight.value >= 5 ? '#B28A12' : '#2D8A3C'
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold w-6">{weight.value}/10</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{weight.description}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(weight)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(weight.id)}>
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
