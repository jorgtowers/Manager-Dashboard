// Helper functions to generate dates
const getTodayDate = () => new Date().toISOString().split('T')[0];
const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
};
const getFutureDate = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
};
const getPastDate = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
};
const getYesterdayDate = () => getPastDate(1);
const getCurrentTime = () => new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

// Constants for statuses and priorities
const STATUS = {
    PENDING: 'pendiente',
    IN_PROGRESS: 'en_progreso',
    COMPLETED: 'completado',
    IN_ATTENTION: 'en_atencion',
    ATTENDED: 'atendido',
    UP: 'up',
    DOWN: 'down'
} as const;
const PRIORITY = { HIGH: 'alta', MEDIUM: 'media', LOW: 'baja' } as const;

// Default data structure. IDs are removed as the DB will auto-generate them.
export const defaultData = {
    meetings: [
        { title: 'Reunión de seguimiento de proyecto', date: getTodayDate(), time: '09:00', duration: 60, participants: 'Equipo de desarrollo', description: 'Revisión de avances del sprint' },
        { title: 'Reunión con clientes', date: getTodayDate(), time: '14:00', duration: 90, participants: 'Cliente externo', description: 'Demo de nuevas funcionalidades' },
        { title: 'Revisión de incidentes', date: getTomorrowDate(), time: '11:00', duration: 30, participants: 'Equipo de soporte', description: 'Análisis de incidentes de la semana' }
    ],
    assignments: [
        { title: 'Desarrollo de módulo de usuarios', employee: 'Juan Pérez', department: 'Desarrollo', status: STATUS.IN_PROGRESS, priority: PRIORITY.HIGH, description: 'Implementar CRUD de usuarios', dueDate: getFutureDate(5) },
        { title: 'Configuración de servidores', employee: 'María García', department: 'Infraestructura', status: STATUS.PENDING, priority: PRIORITY.HIGH, description: 'Setup de servidores para producción', dueDate: getFutureDate(3) },
        { title: 'Documentación técnica', employee: 'Carlos López', department: 'Documentación', status: STATUS.COMPLETED, priority: PRIORITY.MEDIUM, description: 'Actualizar manuales de usuario', dueDate: getFutureDate(-2) }
    ],
    clients: [
        { name: 'Empresa ABC', contact: 'Pedro González', need: 'Implementación de sistema', status: STATUS.IN_ATTENTION, description: 'Necesitan sistema de inventario', priority: PRIORITY.HIGH, date: getPastDate(2) },
        { name: 'Corporación XYZ', contact: 'Ana Martínez', need: 'Soporte técnico', status: STATUS.PENDING, description: 'Problemas con servidor', priority: PRIORITY.MEDIUM, date: getYesterdayDate() }
    ],
    todos: [
        { title: 'Revisar presupuesto mensual', priority: PRIORITY.HIGH, dueDate: getTodayDate(), completed: false },
        { title: 'Aprobar vacaciones del equipo', priority: PRIORITY.MEDIUM, dueDate: getTomorrowDate(), completed: false },
        { title: 'Actualizar matriz de riesgos', priority: PRIORITY.LOW, dueDate: getFutureDate(7), completed: true }
    ],
    services: [
        { name: 'Hosting AWS', provider: 'Amazon Web Services', startDate: getPastDate(180), endDate: getFutureDate(15), cost: 250 },
        { name: 'Licencia Microsoft 365', provider: 'Microsoft', startDate: getPastDate(300), endDate: getFutureDate(60), cost: 500 },
        { name: 'Certificado SSL', provider: 'GoDaddy', startDate: getPastDate(350), endDate: getFutureDate(5), cost: 80 },
        { name: 'Soporte Oracle', provider: 'Oracle', startDate: getPastDate(200), endDate: getFutureDate(165), cost: 1200 }
    ],
    criticalServices: [
        { name: 'Servidor Principal', ip: '192.168.1.100', status: STATUS.UP, lastCheck: getCurrentTime(), department: 'Infraestructura' },
        { name: 'Base de Datos Producción', ip: '192.168.1.101', status: STATUS.UP, lastCheck: getCurrentTime(), department: 'Bases de Datos' },
        { name: 'Sistema de Backup', ip: '192.168.1.102', status: STATUS.DOWN, lastCheck: getCurrentTime(), department: 'Infraestructura' },
        { name: 'Firewall Corporativo', ip: '192.168.1.1', status: STATUS.UP, lastCheck: getCurrentTime(), department: 'Seguridad' }
    ]
};