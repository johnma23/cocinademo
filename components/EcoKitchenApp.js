import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Calendar, ShoppingCart, Archive, ChefHat, Scale, BarChart2, Bell } from 'lucide-react';

const EcoKitchenApp = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, mensaje: "¡Los tomates caducan en 2 días!", tipo: "warning" },
    { id: 2, mensaje: "El aguacate está en su punto óptimo de consumo", tipo: "info" }
  ]);

  const wasteData = [
    { semana: 'Sem 1', desperdicios: 2.5 },
    { semana: 'Sem 2', desperdicios: 2.1 },
    { semana: 'Sem 3', desperdicios: 1.8 },
    { semana: 'Sem 4', desperdicios: 1.5 }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-700 mb-2">EcoKitchen</h1>
        <p className="text-gray-600">Gestiona tu cocina de manera sostenible</p>
      </header>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Inventario
          </TabsTrigger>
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Almacenamiento
          </TabsTrigger>
          <TabsTrigger value="waste" className="flex items-center gap-2">
            <Scale className="w-4 h-4" />
            Desperdicios
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4" />
            Análisis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Compras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Nombre del producto" className="flex-1" />
                  <Input type="number" placeholder="Cantidad" className="w-24" />
                  <select className="border rounded-md p-2">
                    <option>Semanal</option>
                    <option>Quincenal</option>
                    <option>Mensual</option>
                  </select>
                  <Button>Agregar</Button>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Productos Registrados</h3>
                  <div className="space-y-2">
                    {['Tomates - 1kg', 'Aguacates - 500g', 'Lechugas - 2u'].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>{item}</span>
                        <Button variant="outline" size="sm">Editar</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Alertas de Caducidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificaciones.map((notif) => (
                  <Alert key={notif.id}>
                    <AlertDescription>{notif.mensaje}</AlertDescription>
                  </Alert>
                ))}
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-4">Guía de Almacenamiento</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { producto: 'Tomates', lugar: 'Refrigerador', tiempo: '7-10 días' },
                      { producto: 'Aguacates', lugar: 'Temperatura ambiente', tiempo: '3-5 días' }
                    ].map((item, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded">
                        <div className="font-medium">{item.producto}</div>
                        <div className="text-sm text-gray-600">{item.lugar}</div>
                        <div className="text-sm text-gray-600">Duración: {item.tiempo}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waste">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Desperdicios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <Scale className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium">Conectando con la báscula...</p>
                <p className="text-sm text-gray-500">Asegúrate que el dispositivo está encendido y cerca</p>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Último registro</h3>
                <div className="p-4 bg-gray-50 rounded">
                  <div className="text-2xl font-bold text-green-700">1.2 kg</div>
                  <div className="text-sm text-gray-600">Desperdicios de hoy</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Desperdicios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <LineChart width={600} height={200} data={wasteData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semana" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="desperdicios" stroke="#059669" />
                </LineChart>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded">
                  <div className="text-lg font-semibold">-25%</div>
                  <div className="text-sm text-gray-600">Reducción mensual</div>
                </div>
                <div className="p-4 bg-green-50 rounded">
                  <div className="text-lg font-semibold">7.9 kg</div>
                  <div className="text-sm text-gray-600">Total mensual</div>
                </div>
                <div className="p-4 bg-green-50 rounded">
                  <div className="text-lg font-semibold">1.8 kg</div>
                  <div className="text-sm text-gray-600">Promedio semanal</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EcoKitchenApp;
