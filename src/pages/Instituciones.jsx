import React, { useState, useEffect } from 'react';
// ----------------------------------------------------------------------
// IMPORTACIONES DE UI CORREGIDAS PARA USAR EL ALIAS @/
// ----------------------------------------------------------------------
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/componentesUI/card';
import { Button } from '@/componentesUI/button';
import { Input } from '@/componentesUI/input';
import { Badge } from '@/componentesUI/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/componentesUI/tabs';
import { Avatar, AvatarFallback } from '@/componentesUI/avatar';
import { Progress } from '@/componentesUI/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/componentesUI/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/componentesUI/dialog';
import { Label } from '@/componentesUI/label';
import { Textarea } from '@/componentesUI/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/componentesUI/select';

// ----------------------------------------------------------------------
// IMPORTACIONES EXTERNAS
// ----------------------------------------------------------------------
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Search, Users, GraduationCap, LogOut, Briefcase, BookOpen, TrendingUp, Award, AlertCircle, CheckCircle, Clock, Target, MessageSquare, Phone, Eye, Download, Building2 } from 'lucide-react';
import { toast } from 'sonner';

// ----------------------------------------------------------------------
// LÓGICA MÓVIL (SIN CAMBIOS ESTRUCTURALES MAYORES)
// ----------------------------------------------------------------------

const useIsMobile = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return width <= 768;
};

// Componente MobileNav: Ahora NO recibe 'children' (o lo ignora) porque TabsList se moverá.
const MobileNav = ({ user, onLogout, alertCount }) => (
    <header className="bg-white dark:bg-gray-800 border-b p-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarFallback>{user?.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="font-semibold text-lg">Panel Institucional</h1>
                    <p className="text-sm text-muted-foreground">¡Hola, {user?.name || 'Usuario'}!</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {alertCount > 0 && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {alertCount}
                    </Badge>
                )}
                <Button variant="outline" size="icon" onClick={onLogout}>
                    <LogOut className="h-4 w-4" />
                </Button>
            </div>
        </div>
        {/* <div className="mt-4">{children}</div> <-- ELIMINADO / IGNORADO */}
    </header>
);

const MobileTabs = ({ tabs, activeTab, onTabChange }) => (
    <TabsList className="w-full grid grid-cols-5">
        {tabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex flex-col h-auto py-2 text-xs" onClick={() => onTabChange(tab.value)}>
                {tab.icon}
                {tab.label}
            </TabsTrigger>
        ))}
    </TabsList>
);

// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------

export default function InstitutionDashboard({ user, onLogout }) {
    // --- ESTADOS Y LÓGICA (Misma que antes) ---
    const [graduatesData, setGraduatesData] = useState([]);
    const [employmentByCareerData, setEmploymentByCareerData] = useState([]);
    const [employmentTrendData, setEmploymentTrendData] = useState([]);
    const [statusDistributionData, setStatusDistributionData] = useState([]);
    const [topCompaniesData, setTopCompaniesData] = useState([]);
    const [followUpActivitiesData, setFollowUpActivitiesData] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [careerFilter, setCareerFilter] = useState('all');
    const [selectedGraduate, setSelectedGraduate] = useState(null);
    const [showContactModal, setShowContactModal] = useState(false);
    const [contactNote, setContactNote] = useState('');
    const [activeTab, setActiveTab] = useState('overview');

    const isMobile = useIsMobile();

    useEffect(() => {
        // Llama a tu API aquí para cargar los datos:
        // Inicializa con datos dummy (ejemplo para evitar crash de gráficos)
        setGraduatesData([]);
        setEmploymentTrendData([
            // { period: '2022', rate: 70 }, 
            // { period: '2023', rate: 75 }
        ]);
        setStatusDistributionData([
            // { name: 'Empleado', value: 60, color: '#10b981' }, 
            // { name: 'Buscando empleo', value: 20, color: '#ef4444' }
        ]);
    }, []);

    // --- LÓGICA BASADA EN DATOS (Misma que antes) ---
    const filteredGraduates = graduatesData.filter(graduate => {
        const nameMatch = graduate.name && graduate.name.toLowerCase().includes(searchTerm.toLowerCase());
        const careerMatch = graduate.career && graduate.career.toLowerCase().includes(searchTerm.toLowerCase());
        const companyMatch = graduate.company && graduate.company.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSearch = nameMatch || careerMatch || companyMatch;
        const matchesStatus = statusFilter === 'all' || graduate.currentStatus === statusFilter;
        const matchesCareer = careerFilter === 'all' || graduate.career === careerFilter;
        return matchesSearch && matchesStatus && matchesCareer;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Empleado':
                return <Badge className="bg-green-500 text-white">Empleado</Badge>;
            case 'Freelancer':
                return <Badge className="bg-yellow-500 text-white">Freelancer</Badge>;
            case 'Buscando empleo':
                return <Badge className="bg-red-500 text-white">Buscando empleo</Badge>;
            default:
                return <Badge variant="secondary">{status || 'N/A'}</Badge>;
        }
    };

    const handleContactGraduate = (graduate) => {
        setSelectedGraduate(graduate);
        setShowContactModal(true);
    };

    const handleSendContact = () => {
        if (selectedGraduate && contactNote) {
            toast.success(`Contacto registrado con ${selectedGraduate.name}`);
            setShowContactModal(false);
            setContactNote('');
            setSelectedGraduate(null);
        }
    };

    const exportData = () => {
        toast.success('Preparando exportación de datos...');
    };

    const graduatesNeedingSupport = graduatesData.filter(g => g.needsSupport).length;
    const totalGraduates = graduatesData.length;
    const averageSatisfaction = totalGraduates > 0
        ? graduatesData.reduce((acc, g) => acc + (g.satisfactionScore || 0), 0) / totalGraduates
        : 0;

    const tabsConfig = [
        { value: 'overview', label: 'Resumen', icon: <TrendingUp className="h-4 w-4" /> },
        { value: 'graduates', label: 'Egresados', icon: <Users className="h-4 w-4" /> },
        { value: 'tracking', label: 'Seguimiento', icon: <Target className="h-4 w-4" /> },
        { value: 'analytics', label: 'Análisis', icon: <BarChart className="h-4 w-4" /> },
        { value: 'programs', label: 'Programas', icon: <BookOpen className="h-4 w-4" /> }
    ];

    const careersList = Array.from(new Set(graduatesData.map(g => g.career).filter(c => c)));
    const employmentRate = statusDistributionData.find(d => d.name === 'Empleado')?.value || 0;


    // --- CONTENIDO DE LAS PESTAÑAS (Misma que antes) ---
    const tabsContent = (
        // ... (Contenido completo de todas las pestañas: overview, graduates, tracking, analytics, programs)
        <>
            {/* PESTAÑA RESUMEN */}
            <TabsContent value="overview" className="space-y-6 m-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card: Total Egresados */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Egresados</CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalGraduates}</div>
                            <p className="text-xs text-muted-foreground">Datos del sistema</p>
                        </CardContent>
                    </Card>

                    {/* Card: Tasa de Empleabilidad */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tasa de Empleabilidad</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{employmentRate}%</div>
                            <p className="text-xs text-muted-foreground">Empleo vs Total</p>
                        </CardContent>
                    </Card>

                    {/* Card: Satisfacción Promedio */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Satisfacción Promedio</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{averageSatisfaction.toFixed(1)}/5</div>
                            <p className="text-xs text-muted-foreground">Basado en encuestas</p>
                        </CardContent>
                    </Card>

                    {/* Card: Necesitan Apoyo */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Necesitan Apoyo</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{graduatesNeedingSupport}</div>
                            <p className="text-xs text-muted-foreground">Requieren seguimiento especial</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Gráfico: Tendencia de Empleabilidad */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Tendencia de Empleabilidad</CardTitle>
                            <CardDescription>Porcentaje de empleabilidad por período</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {employmentTrendData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={employmentTrendData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="period" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="rate" name="Tasa (%)" stroke="#3b82f6" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-center text-muted-foreground py-12">Datos de tendencia no disponibles.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Gráfico: Estado de Egresados */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Estado de Egresados</CardTitle>
                            <CardDescription>Distribución actual del estado laboral</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {statusDistributionData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={statusDistributionData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            dataKey="value"
                                            label={({ name, value }) => `${name}: ${value}%`}
                                        >
                                            {statusDistributionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-center text-muted-foreground py-12">Datos de distribución no disponibles.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Alertas */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            Alertas y Notificaciones
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {graduatesNeedingSupport > 0 ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                                    <AlertCircle className="h-5 w-5 text-red-600" />
                                    <div className="flex-1">
                                        <div className="font-medium text-red-800 dark:text-red-200">Alerta de seguimiento</div>
                                        <div className="text-sm text-red-600 dark:text-red-300">{graduatesNeedingSupport} egresados requieren contacto.</div>
                                    </div>
                                    <Button size="sm" variant="outline" onClick={() => setActiveTab('graduates')}>Ver egresados</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <div className="font-medium text-green-800 dark:text-green-200">Sin alertas pendientes.</div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>

            {/* PESTAÑA EGRESADOS */}
            <TabsContent value="graduates" className="space-y-6 m-0">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar egresados por nombre, carrera o empresa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Estado laboral" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los estados</SelectItem>
                            <SelectItem value="Empleado">Empleado</SelectItem>
                            <SelectItem value="Freelancer">Freelancer</SelectItem>
                            <SelectItem value="Buscando empleo">Buscando empleo</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={careerFilter} onValueChange={setCareerFilter}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Carrera" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las carreras</SelectItem>
                            {careersList.map(career => (
                                <SelectItem key={career} value={career}>{career}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={exportData}>
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Registro de Egresados ({filteredGraduates.length})</CardTitle>
                        <CardDescription>Seguimiento detallado del estado laboral de los egresados</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {filteredGraduates.length === 0 ? (
                            <p className="text-center text-muted-foreground py-10">No hay datos de egresados disponibles.</p>
                        ) : isMobile ? (
                            <div className="space-y-4">
                                {filteredGraduates.map((graduate) => (
                                    <Card key={graduate.id} className="border">
                                        <CardContent className="pt-4">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarFallback>{graduate.name ? graduate.name.charAt(0) : 'U'}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="font-medium">{graduate.name}</div>
                                                        <div className="text-sm text-muted-foreground">{graduate.career}</div>
                                                    </div>
                                                    {graduate.needsSupport && (
                                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-muted-foreground">Estado:</span>
                                                        {getStatusBadge(graduate.currentStatus)}
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-muted-foreground">Empresa:</span>
                                                        <span className="text-sm">{graduate.company || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-muted-foreground">Satisfacción:</span>
                                                        <div className="flex items-center gap-1">
                                                            <Award className="h-4 w-4 text-yellow-500" />
                                                            <span className="text-sm">{graduate.satisfactionScore || 'N/A'}/5</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-1 pt-2">
                                                    <Button size="sm" variant="outline" onClick={() => handleContactGraduate(graduate)}>
                                                        <MessageSquare className="h-3 w-3" />
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <Phone className="h-3 w-3" />
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <Eye className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Egresado</TableHead>
                                        <TableHead>Carrera</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Empresa</TableHead>
                                        <TableHead>Satisfacción</TableHead>
                                        <TableHead>Último Contacto</TableHead>
                                        <TableHead>Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredGraduates.map((graduate) => (
                                        <TableRow key={graduate.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarFallback>{graduate.name ? graduate.name.charAt(0) : 'U'}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{graduate.name}</div>
                                                        <div className="text-sm text-muted-foreground">{graduate.email}</div>
                                                    </div>
                                                    {graduate.needsSupport && (
                                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div>{graduate.career}</div>
                                                    <div className="text-sm text-muted-foreground">Clase {graduate.graduationYear}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(graduate.currentStatus)}</TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{graduate.company || 'N/A'}</div>
                                                    <div className="text-sm text-muted-foreground">{graduate.position || 'N/A'}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Award className="h-4 w-4 text-yellow-500" />
                                                    <span>{graduate.satisfactionScore || 'N/A'}/5</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">{graduate.lastContact || 'N/A'}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <Button size="sm" variant="outline" onClick={() => handleContactGraduate(graduate)}>
                                                        <MessageSquare className="h-3 w-3" />
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <Phone className="h-3 w-3" />
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <Eye className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>

            {/* PESTAÑA SEGUIMIENTO */}
            <TabsContent value="tracking" className="space-y-6 m-0">
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Actividades de Seguimiento Recientes</CardTitle>
                            <CardDescription>Últimas interacciones con egresados</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {followUpActivitiesData.length === 0 ? (
                                <p className="text-center text-muted-foreground py-4">No hay actividades de seguimiento registradas.</p>
                            ) : (
                                <div className="space-y-4">
                                    {/* Mapear followUpActivitiesData aquí */}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    {/* ... Resto de las métricas de seguimiento ... */}
                </div>
            </TabsContent>

            {/* PESTAÑA ANÁLISIS */}
            <TabsContent value="analytics" className="space-y-6 m-0">
                <Card>
                    <CardHeader>
                        <CardTitle>Empleabilidad por Carrera</CardTitle>
                        <CardDescription>Comparación de tasas de empleo por programa académico</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {employmentByCareerData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={employmentByCareerData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="empleados" name="Empleados" stackId="a" fill="#10b981" />
                                    <Bar dataKey="buscando" name="Buscando empleo" stackId="a" fill="#ef4444" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-muted-foreground py-12">Datos de empleabilidad por carrera no disponibles.</p>
                        )}
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Card: Tiempo Promedio de Inserción Laboral */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Tiempo Promedio de Inserción Laboral</CardTitle>
                            <CardDescription>Por carrera (en meses)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-muted-foreground py-4">Dato pendiente de API</p>
                        </CardContent>
                    </Card>

                    {/* Card: Principales Empleadores */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Principales Empleadores</CardTitle>
                            <CardDescription>Empresas con más egresados contratados</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {topCompaniesData.length > 0 ? (
                                <div className="space-y-4">
                                    {/* Mapear topCompaniesData aquí */}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-4">Datos de empleadores pendientes de API.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            {/* PESTAÑA PROGRAMAS */}
            <TabsContent value="programs" className="space-y-6 m-0">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Card: Programas de Actualización (Placeholder para la estructura) */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Programas de Actualización</CardTitle>
                            <CardDescription>Cursos y capacitaciones disponibles para egresados</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-center text-muted-foreground py-4">Contenido de programas pendiente de API.</p>
                        </CardContent>
                    </Card>

                    {/* Card: Red de Mentorías (Placeholder para la estructura) */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Red de Mentorías</CardTitle>
                            <CardDescription>Conectando egresados exitosos con nuevos graduados</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-center text-muted-foreground py-4">Métricas de mentorías pendientes de API.</p>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </>
    );

    // ----------------------------------------------------------------------
    // RENDERIZADO CONDICIONAL (Versión Móvil Corregida)
    // ----------------------------------------------------------------------

    if (isMobile) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <MobileNav
                    user={user}
                    onLogout={onLogout}
                    alertCount={graduatesNeedingSupport}
                /> {/* <-- MobileNav sin TabsList */}

                <div className="p-4 space-y-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        {/* 🚨 SOLUCIÓN: MobileTabs (que contiene TabsList) va DENTRO de Tabs */}
                        <MobileTabs
                            tabs={tabsConfig}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                        {tabsContent}
                    </Tabs>
                </div>

                {/* Modal de Contacto (Mobile) - Mismo que antes */}
                <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
                    <DialogContent className="mx-4">
                        <DialogHeader>
                            <DialogTitle>Contactar Egresado</DialogTitle>
                            <DialogDescription>
                                Registrar contacto con {selectedGraduate?.name || 'el egresado seleccionado'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="contact-type">Tipo de Contacto</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="phone">Llamada telefónica</SelectItem>
                                        <SelectItem value="email">Correo electrónico</SelectItem>
                                        <SelectItem value="meeting">Reunión presencial</SelectItem>
                                        <SelectItem value="survey">Encuesta</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notas del Contacto</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Detalles de la conversación, seguimiento necesario, etc."
                                    value={contactNote}
                                    onChange={(e) => setContactNote(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" onClick={() => setShowContactModal(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={handleSendContact}>
                                Registrar Contacto
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    // Versión de Escritorio - Mismo que antes
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 border-b">
                <div className="container mx-auto px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarFallback>{user?.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="font-semibold">¡Hola, {user?.name || 'Usuario'}!</h1>
                                <p className="text-sm text-muted-foreground">Panel de seguimiento de egresados</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {graduatesNeedingSupport > 0 && (
                                <Badge variant="destructive" className="flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {graduatesNeedingSupport}
                                </Badge>
                            )}
                            <Button variant="outline" onClick={onLogout}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Cerrar Sesión
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-8 py-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid grid-cols-5 w-full">
                        {tabsConfig.map(tab => (
                            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2" onClick={() => setActiveTab(tab.value)}>
                                {tab.icon}
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tabsContent}
                </Tabs>
            </main>

            {/* Modal de Contacto (Escritorio) - Mismo que antes */}
            <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Contactar Egresado</DialogTitle>
                        <DialogDescription>
                            Registrar contacto con {selectedGraduate?.name || 'el egresado seleccionado'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact-type">Tipo de Contacto</Label>
                            <Select defaultValue="email">
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="phone">Llamada telefónica</SelectItem>
                                    <SelectItem value="email">Correo electrónico</SelectItem>
                                    <SelectItem value="meeting">Reunión presencial</SelectItem>
                                    <SelectItem value="survey">Encuesta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="notes">Notas del Contacto</Label>
                            <Textarea
                                id="notes"
                                placeholder="Detalles de la conversación, seguimiento necesario, etc."
                                value={contactNote}
                                onChange={(e) => setContactNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setShowContactModal(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSendContact}>
                            Registrar Contacto
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
