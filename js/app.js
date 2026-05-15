/**
 * TechManager - Tablero de Control para Gerente de Tecnología
 * Lógica de la aplicación
 */

// ============================================
// DATOS INICIALES Y ESTRUCTURA
// ============================================

// Almacenamiento de datos en localStorage
const DB_KEY = 'techmanager_db';
const NOTIFICATIONS_KEY = 'techmanager_notifications';

// Constantes para estados y prioridades
const STATUS = {
    PENDING: 'pendiente',
    IN_PROGRESS: 'en_progreso',
    COMPLETED: 'completado',
    SENT: 'enviada',
    IN_PROCESS: 'en_proceso',
    ATTENDED: 'atendido',
    IN_ATTENTION: 'en_atencion',
    UP: 'up',
    DOWN: 'down'
};

const PRIORITY = { HIGH: 'alta', MEDIUM: 'media', LOW: 'baja' };

// Datos por defecto
const defaultData = {
    meetings: [
        { id: 1, title: 'Reunión de seguimiento de proyecto', date: getTodayDate(), time: '09:00', duration: 60, participants: 'Equipo de desarrollo', description: 'Revisión de avances del sprint' },
        { id: 2, title: 'Reunión con clientes', date: getTodayDate(), time: '14:00', duration: 90, participants: 'Cliente externo', description: 'Demo de nuevas funcionalidades' },
        { id: 3, title: 'Revisión de incidentes', date: getTomorrowDate(), time: '11:00', duration: 30, participants: 'Equipo de soporte', description: 'Análisis de incidentes de la semana' }
    ],
    assignments: [
        { id: 1, title: 'Desarrollo de módulo de usuarios', employee: 'Juan Pérez', department: 'Desarrollo', status: STATUS.IN_PROGRESS, priority: PRIORITY.HIGH, description: 'Implementar CRUD de usuarios', dueDate: getFutureDate(5) },
        { id: 2, title: 'Configuración de servidores', employee: 'María García', department: 'Infraestructura', status: STATUS.PENDING, priority: PRIORITY.HIGH, description: 'Setup de servidores para producción', dueDate: getFutureDate(3) },
        { id: 3, title: 'Documentación técnica', employee: 'Carlos López', department: 'Documentación', status: STATUS.COMPLETED, priority: PRIORITY.MEDIUM, description: 'Actualizar manuales de usuario', dueDate: getFutureDate(-2) }
    ],
    requests: {
        employees: [
            { id: 1, title: 'Solicitud de laptop', recipient: 'Juan Pérez', type: 'Equipo', status: STATUS.IN_PROCESS, description: 'Laptop Dell XPS 15 para desarrollo', date: getPastDate(3) },
            { id: 2, title: 'Acceso a base de datos', recipient: 'María García', type: 'Acceso', status: STATUS.SENT, description: 'Acceso de lectura a BD producción', date: getPastDate(1) }
        ],
        departments: [
            { id: 1, title: 'Mantenimiento de impresoras', department: 'Administración', type: 'Mantenimiento', status: STATUS.IN_PROCESS, description: 'Service de impresoras del 2do piso', date: getPastDate(5) },
            { id: 2, title: 'Configuración de red', department: 'Recursos Humanos', type: 'Infraestructura', status: STATUS.COMPLETED, description: 'Extensión de red WiFi', date: getPastDate(10) }
        ]
    },
    clients: [
        { id: 1, name: 'Empresa ABC', contact: 'Pedro González', need: 'Implementación de sistema', status: STATUS.IN_ATTENTION, description: 'Necesitan sistema de inventario', priority: PRIORITY.HIGH, date: getPastDate(2) },
        { id: 2, name: 'Corporación XYZ', contact: 'Ana Martínez', need: 'Soporte técnico', status: STATUS.PENDING, description: 'Problemas con servidor', priority: PRIORITY.MEDIUM, date: getYesterdayDate() }
    ],
    todos: [
        { id: 1, title: 'Revisar presupuesto mensual', priority: PRIORITY.HIGH, dueDate: getTodayDate(), completed: false },
        { id: 2, title: 'Aprobar vacaciones del equipo', priority: PRIORITY.MEDIUM, dueDate: getTomorrowDate(), completed: false },
        { id: 3, title: 'Actualizar matriz de riesgos', priority: PRIORITY.LOW, dueDate: getFutureDate(7), completed: true }
    ],
    services: [
        { id: 1, name: 'Hosting AWS', provider: 'Amazon Web Services', startDate: getPastDate(180), endDate: getFutureDate(15), cost: 250 },
        { id: 2, name: 'Licencia Microsoft 365', provider: 'Microsoft', startDate: getPastDate(300), endDate: getFutureDate(60), cost: 500 },
        { id: 3, name: 'Certificado SSL', provider: 'GoDaddy', startDate: getPastDate(350), endDate: getFutureDate(5), cost: 80 },
        { id: 4, name: 'Soporte Oracle', provider: 'Oracle', startDate: getPastDate(200), endDate: getFutureDate(165), cost: 1200 }
    ],
    criticalServices: [
        { id: 1, name: 'Servidor Principal', ip: '192.168.1.100', status: STATUS.UP, lastCheck: getCurrentTime(), department: 'Infraestructura' },
        { id: 2, name: 'Base de Datos Producción', ip: '192.168.1.101', status: STATUS.UP, lastCheck: getCurrentTime(), department: 'Bases de Datos' },
        { id: 3, name: 'Sistema de Backup', ip: '192.168.1.102', status: STATUS.DOWN, lastCheck: getCurrentTime(), department: 'Infraestructura' },
        { id: 4, name: 'Firewall Corporativo', ip: '192.168.1.1', status: STATUS.UP, lastCheck: getCurrentTime(), department: 'Seguridad' }
    ]
};

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function getYesterdayDate() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
}

function getTomorrowDate() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
}

function getFutureDate(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
}

function getPastDate(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
}

function getCurrentTime() {
    return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getDaysUntil(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return diff;
}

function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

// ============================================
// GESTIÓN DE DATOS
// ============================================

function loadData() {
    const stored = localStorage.getItem(DB_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    saveData(defaultData);
    return defaultData;
}

function saveData(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
}

function getData() {
    return loadData();
}

function updateData(callback) {
    const data = loadData();
    callback(data);
    saveData(data);
    refreshAllModules();
}

// ============================================
// INICIALIZACIÓN
// ============================================

let currentData = loadData();
let currentModule = 'dashboard';
let currentMonth = new Date();

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setCurrentDate();
    initializeNavigation();
    initializeCalendar();
    refreshAllModules();
    checkAlerts();
    
    // Auto-refresh cada minuto
    setInterval(checkAlerts, 60000);
}

function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('es-ES', options);
}

// ============================================
// NAVEGACIÓN
// ============================================

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const module = this.getAttribute('data-module');
            switchModule(module);
        });
    });
}

function switchModule(moduleName) {
    // Actualizar navegación
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-module') === moduleName) {
            item.classList.add('active');
        }
    });
    
    // Actualizar módulos
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });
    document.getElementById(`module-${moduleName}`).classList.add('active');
    
    currentModule = moduleName;
    
    // Cerrar sidebar en mobile
    if (window.innerWidth < 992) {
        document.getElementById('sidebar').classList.remove('open');
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// ============================================
// DASHBOARD
// ============================================

function refreshAllModules() {
    updateDashboardStats();
    renderMeetingsList();
    renderAssignments();
    renderRequests();
    renderClients();
    renderTodos();
    renderServices();
    renderCriticalServices();
    updateBadges();
    checkAlerts();
}

function updateDashboardStats() {
    const data = getData();
    
    // Reuniones hoy
    const today = getTodayDate();
    const meetingsToday = data.meetings.filter(m => m.date === today).length;
    document.getElementById('stat-meetings-today').textContent = meetingsToday;
    
    // Asignaciones pendientes
    const pendingAssignments = data.assignments.filter(a => a.status !== STATUS.COMPLETED).length;
    document.getElementById('stat-assignments-pending').textContent = pendingAssignments;
    
    // Solicitudes activas
    const activeRequests = [...data.requests.employees, ...data.requests.departments]
        .filter(r => r.status !== STATUS.COMPLETED).length;
    document.getElementById('stat-requests-active').textContent = activeRequests;
    
    // Servicios caídos
    const servicesDown = data.criticalServices.filter(s => s.status === STATUS.DOWN).length;
    document.getElementById('stat-services-down').textContent = servicesDown;
}

function updateBadges() {
    const data = getData();
    
    // Badge reuniones
    const today = getTodayDate();
    const todayMeetings = data.meetings.filter(m => m.date === today).length;
    document.getElementById('badge-meetings').textContent = todayMeetings;
    
    // Badge asignaciones
    const pendingAssignments = data.assignments.filter(a => a.status !== STATUS.COMPLETED).length;
    document.getElementById('badge-assignments').textContent = pendingAssignments;
    
    // Badge solicitudes
    const activeRequests = [...data.requests.employees, ...data.requests.departments]
        .filter(r => r.status !== STATUS.COMPLETED).length;
    document.getElementById('badge-requests').textContent = activeRequests;
    
    // Badge clientes
    const pendingClients = data.clients.filter(c => c.status !== STATUS.ATTENDED).length;
    document.getElementById('badge-clients').textContent = pendingClients;
    
    // Badge todos
    const pendingTodos = data.todos.filter(t => !t.completed).length;
    document.getElementById('badge-todos').textContent = pendingTodos;
    
    // Badge servicios por vencer
    const expiringServices = data.services.filter(s => {
        const days = getDaysUntil(s.endDate);
        return days > 0 && days <= 7;
    }).length;
    document.getElementById('badge-services').textContent = expiringServices;
    
    // Badge servicios críticos caídos
    const downServices = data.criticalServices.filter(s => s.status === STATUS.DOWN).length;
    const badgeCritical = document.getElementById('badge-critical');
    badgeCritical.textContent = downServices;
    
    if (downServices > 0) {
        badgeCritical.classList.add('active');
    } else {
        badgeCritical.classList.remove('active');
    }
}

// ============================================
// ALERTAS
// ============================================

function checkAlerts() {
    const data = getData();
    const alertsContainer = document.getElementById('alerts-container');
    const alerts = [];
    
    // Verificar servicios críticos caídos
    const downServices = data.criticalServices.filter(s => s.status === STATUS.DOWN);
    downServices.forEach(service => {
        alerts.push({
            type: 'danger',
            title: `Servicio caído: ${service.name}`,
            message: `El servicio está fuera de línea. IP: ${service.ip}`
        });
    });
    
    // Verificar servicios por vencer
    data.services.forEach(service => {
        const days = getDaysUntil(service.endDate);
        if (days > 0 && days <= 7) {
            alerts.push({
                type: 'warning',
                title: `Servicio por vencer: ${service.name}`,
                message: `Vence en ${days} día(s)`
            });
        } else if (days <= 0) {
            alerts.push({
                type: 'danger',
                title: `Servicio vencido: ${service.name}`,
                message: 'Requiere renovación inmediata'
            });
        }
    });
    
    // Verificar asignaciones vencidas
    const today = getTodayDate();
    data.assignments.forEach(assignment => {
        if (assignment.status !== STATUS.COMPLETED && assignment.dueDate < today) {
            alerts.push({
                type: 'warning',
                title: `Asignación vencida: ${assignment.title}`,
                message: `Asignada a ${assignment.employee}, fecha límite: ${formatDate(assignment.dueDate)}`
            });
        }
    });
    
    // Verificar reuniones de hoy
    const todayMeetings = data.meetings.filter(m => m.date === today);
    if (todayMeetings.length > 0) {
        alerts.push({
            type: 'info',
            title: `${todayMeetings.length} reunión(es) programada(s) hoy`,
            message: `Próxima: ${todayMeetings[0].title} a las ${todayMeetings[0].time}`
        });
    }
    
    // Renderizar alertas
    if (alerts.length === 0) {
        alertsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-check-circle"></i>
                <p>No hay alertas activas. Todo está en orden.</p>
            </div>
        `;
    } else {
        alertsContainer.innerHTML = alerts.map(alert => `
            <div class="alert-item ${alert.type}">
                <i class="fas fa-${alert.type === 'danger' ? 'times-circle' : alert.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <div>
                    <strong>${alert.title}</strong>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">${alert.message}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Actualizar indicador de notificaciones
    const notificationDot = document.getElementById('notification-dot');
    if (alerts.filter(a => a.type === 'danger').length > 0) {
        notificationDot.classList.add('active');
    } else {
        notificationDot.classList.remove('active');
    }
}

// ============================================
// REUNIONES
// ============================================

function initializeCalendar() {
    renderCalendar();
}

function renderCalendar() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Actualizar título
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    document.getElementById('calendar-month').textContent = `${monthNames[month]} ${year}`;
    
    const calendarGrid = document.getElementById('calendar-grid');
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    // Encabezados de días
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    let html = dayNames.map(d => `<div class="calendar-day-header">${d}</div>`).join('');
    
    // Días del mes anterior
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month">${prevMonthDays - i}</div>`;
    }
    
    // Días del mes actual
    const data = getData();
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
        const hasMeeting = data.meetings.some(m => m.date === dateStr);
        
        html += `<div class="calendar-day ${isToday ? 'today' : ''} ${hasMeeting ? 'has-meeting' : ''}" 
                      onclick="showMeetingsForDate('${dateStr}')">${day}</div>`;
    }
    
    // Días del siguiente mes
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    for (let i = 1; i <= totalCells - firstDay - daysInMonth; i++) {
        html += `<div class="calendar-day other-month">${i}</div>`;
    }
    
    calendarGrid.innerHTML = html;
}

function changeMonth(delta) {
    currentMonth.setMonth(currentMonth.getMonth() + delta);
    renderCalendar();
}

function showMeetingsForDate(dateStr) {
    const data = getData();
    const meetings = data.meetings.filter(m => m.date === dateStr);
    
    if (meetings.length > 0) {
        showToast(`${meetings.length} reunión(es) el ${formatDate(dateStr)}`, 'info');
    }
}

function renderMeetingsList() {
    const container = document.getElementById('meetings-list-container');
    const data = getData();
    
    // Ordenar por fecha
    const sortedMeetings = [...data.meetings].sort((a, b) => {
        if (a.date === b.date) return a.time.localeCompare(b.time);
        return a.date.localeCompare(b.date);
    });
    
    if (sortedMeetings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-times"></i>
                <p>No hay reuniones programadas</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = sortedMeetings.map(meeting => `
        <div class="meeting-item">
            <div class="meeting-time">
                <div class="time">${meeting.time}</div>
                <div class="date">${formatDate(meeting.date)}</div>
            </div>
            <div class="meeting-details">
                <h4>${meeting.title}</h4>
                <p><i class="fas fa-users"></i> ${meeting.participants}</p>
                <p><i class="fas fa-align-left"></i> ${meeting.description}</p>
            </div>
            <div class="meeting-actions">
                <button onclick="editMeeting('${meeting.id}')" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteMeeting('${meeting.id}')" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// ============================================
// ASIGNACIONES
// ============================================

function renderAssignments() {
    const container = document.getElementById('assignments-container');
    const data = getData();
    
    // Llenar filtro de empleados
    const employeeFilter = document.getElementById('filter-employee');
    const employees = [...new Set(data.assignments.map(a => a.employee))];
    employeeFilter.innerHTML = '<option value="">Todos los empleados</option>' + 
        employees.map(e => `<option value="${e}">${e}</option>`).join('');
    
    // Filtrar
    const employee = document.getElementById('filter-employee').value;
    const status = document.getElementById('filter-status').value;
    
    let filtered = [...data.assignments];
    if (employee) filtered = filtered.filter(a => a.employee === employee);
    if (status) filtered = filtered.filter(a => a.status === status);
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tasks"></i>
                <p>No hay asignaciones</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(assignment => `
        <div class="assignment-card">
            <div class="assignment-header">
                <h4 class="assignment-title">${assignment.title}</h4>
                <span class="assignment-status ${assignment.status}">${formatStatus(assignment.status)}</span>
            </div>
            <div class="assignment-info">
                <p><i class="fas fa-user"></i> ${assignment.employee}</p>
                <p><i class="fas fa-building"></i> ${assignment.department}</p>
                <p><i class="fas fa-flag"></i> Prioridad: ${assignment.priority}</p>
            </div>
            <div class="assignment-description">${assignment.description}</div>
            <div class="assignment-footer">
                <span class="assignment-date"><i class="fas fa-calendar"></i> ${formatDate(assignment.dueDate)}</span>
                <div class="assignment-actions">
                    ${assignment.status !== STATUS.COMPLETED ? 
                        `<button class="btn-complete" onclick="completeAssignment('${assignment.id}')">
                            <i class="fas fa-check"></i> Completar
                        </button>` : ''}
                    <button class="btn-edit" onclick="editAssignment('${assignment.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterAssignments() {
    renderAssignments();
}

function completeAssignment(id) {
    updateData(data => {
        const assignment = data.assignments.find(a => a.id == id);
        if (assignment) {
            assignment.status = STATUS.COMPLETED;
            showToast('Asignación marcada como completada', 'success');
        }
    });
}

// ============================================
// SOLICITUDES
// ============================================

let currentRequestTab = 'employees';

function renderRequests() {
    const container = document.getElementById('requests-container');
    const data = getData();
    
    const requests = currentRequestTab === 'employees' ? data.requests.employees : data.requests.departments;
    
    if (requests.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-signature"></i>
                <p>No hay solicitudes</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = requests.map(request => `
        <div class="request-card">
            <div class="request-header">
                <div class="request-type">
                    <i class="fas fa-${currentRequestTab === 'employees' ? 'user' : 'building'}"></i>
                    <span>${currentRequestTab === 'employees' ? request.recipient : request.department}</span>
                </div>
                <span class="request-status ${request.status}">${formatStatus(request.status)}</span>
            </div>
            <h4 class="request-title">${request.title}</h4>
            <div class="request-details">
                <p><i class="fas fa-tag"></i> Tipo: ${request.type}</p>
                <p><i class="fas fa-align-left"></i> ${request.description}</p>
            </div>
            <div class="request-footer">
                <span class="request-date"><i class="fas fa-calendar"></i> ${formatDate(request.date)}</span>
                <button class="btn-edit" onclick="editRequest('${request.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function switchRequestTab(tab) {
    currentRequestTab = tab;
    
    document.querySelectorAll('.requests-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tab) {
            btn.classList.add('active');
        }
    });
    
    renderRequests();
}

// ============================================
// CLIENTES
// ============================================

function renderClients() {
    const container = document.getElementById('clients-container');
    const data = getData();
    
    if (data.clients.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <p>No hay clientes registrados</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = data.clients.map(client => `
        <div class="client-card">
            <div class="client-header">
                <h4 class="client-name">${client.name}</h4>
                <span class="client-status ${client.status}">${formatStatus(client.status)}</span>
            </div>
            <p class="client-need"><i class="fas fa-lightbulb"></i> ${client.need}</p>
            <div class="client-description">${client.description}</div>
            <div class="client-info">
                <p><i class="fas fa-user"></i> Contacto: ${client.contact}</p>
                <p><i class="fas fa-flag"></i> Prioridad: ${client.priority}</p>
                <p><i class="fas fa-calendar"></i> ${formatDate(client.date)}</p>
            </div>
            <div class="client-actions">
                ${client.status !== STATUS.ATTENDED ? 
                    `<button class="btn-primary" onclick="updateClientStatus('${client.id}', '${STATUS.ATTENDED}')">
                        <i class="fas fa-check"></i> Atender
                    </button>` : ''}
                <button class="btn-edit" onclick="editClient('${client.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function updateClientStatus(id, status) {
    updateData(data => {
        const client = data.clients.find(c => c.id == id);
        if (client) {
            client.status = status; // status is already STATUS.ATTENDED from the call
            showToast('Cliente marcado como atendido', 'success');
        }
    });
}

// ============================================
// TODOS
// ============================================

function renderTodos() {
    const container = document.getElementById('todos-container');
    const data = getData();
    
    const priority = document.getElementById('filter-priority').value;
    let filtered = [...data.todos];
    if (priority) filtered = filtered.filter(t => t.priority === priority);
    
    // Ordenar: incompletos primero, luego por prioridad
    filtered.sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        const priorityOrder = { [PRIORITY.HIGH]: 0, [PRIORITY.MEDIUM]: 1, [PRIORITY.LOW]: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p>No hay tareas</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}">
            <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" 
                 onclick="toggleTodo('${todo.id}')">
                <i class="fas fa-check"></i>
            </div>
            <div class="todo-content">
                <h4 class="todo-title">${todo.title}</h4>
                <div class="todo-meta">
                    <span class="todo-priority ${todo.priority}">${todo.priority}</span>
                    <span><i class="fas fa-calendar"></i> ${formatDate(todo.dueDate)}</span>
                </div>
            </div>
            <div class="todo-actions">
                <button onclick="editTodo('${todo.id}')" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete" onclick="deleteTodo('${todo.id}')" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function filterTodos() {
    renderTodos();
}

function toggleTodo(id) {
    updateData(data => {
        const todo = data.todos.find(t => t.id == id);
        if (todo) {
            todo.completed = !todo.completed;
            showToast(todo.completed ? 'Tarea completada' : 'Tarea marcada como pendiente', 'success');
        }
    });
}

function deleteTodo(id) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
        updateData(data => {
            data.todos = data.todos.filter(t => t.id != id);
            showToast('Tarea eliminada', 'success');
        });
    }
}

// ============================================
// SERVICIOS
// ============================================

function renderServices() {
    const container = document.getElementById('services-container');
    const data = getData();
    
    let expiring = 0;
    let normal = 0;
    
    const servicesHtml = data.services.map(service => {
        const days = getDaysUntil(service.endDate);
        let status = 'normal';
        
        if (days <= 0) {
            status = 'expired';
            expiring++;
        } else if (days <= 7) {
            status = 'expiring';
            expiring++;
        } else {
            normal++;
        }
        
        const totalDays = Math.ceil((new Date(service.endDate) - new Date(service.startDate)) / (1000 * 60 * 60 * 24));
        const elapsedDays = Math.ceil((new Date() - new Date(service.startDate)) / (1000 * 60 * 60 * 24));
        const progress = Math.min(100, Math.round((elapsedDays / totalDays) * 100));
        
        return `
            <div class="service-card ${status}">
                <div class="service-header">
                    <h4 class="service-name">${service.name}</h4>
                    <span class="service-status ${status}">${formatServiceStatus(status)}</span>
                </div>
                <div class="service-provider">
                    <i class="fas fa-building"></i> ${service.provider}
                </div>
                <div class="service-dates">
                    <div class="date-item">
                        <label>Inicio</label>
                        <span>${formatDate(service.startDate)}</span>
                    </div>
                    <div class="date-item">
                        <label>Vencimiento</label>
                        <span>${formatDate(service.endDate)}</span>
                    </div>
                </div>
                <div class="service-progress">
                    <div class="progress-bar">
                        <div class="progress-fill ${status === 'expired' ? 'danger' : status === 'expiring' ? 'warning' : 'normal'}" 
                             style="width: ${progress}%"></div>
                    </div>
                </div>
                <div class="service-actions">
                    <button class="btn-edit" onclick="editService('${service.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-delete-service" onclick="deleteServiceFromList('${service.id}')" style="background: var(--danger-color); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer;">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('count-expiring').textContent = expiring;
    document.getElementById('count-normal').textContent = normal;
    
    if (data.services.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bell"></i>
                <p>No hay servicios registrados</p>
            </div>
        `;
    } else {
        container.innerHTML = servicesHtml;
    }
}

// ============================================
// SERVICIOS CRÍTICOS
// ============================================

function renderCriticalServices() {
    const container = document.getElementById('critical-services-container');
    const data = getData();
    
    const up = data.criticalServices.filter(s => s.status === STATUS.UP).length;
    const down = data.criticalServices.filter(s => s.status === STATUS.DOWN).length;
    
    document.getElementById('critical-up-count').textContent = up;
    document.getElementById('critical-down-count').textContent = down;
    
    if (data.criticalServices.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-server"></i>
                <p>No hay servicios críticos monitoreados</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = data.criticalServices.map(service => `
        <div class="critical-service-card ${service.status}">
            <div class="critical-service-header">
                <h4 class="critical-service-name">${service.name}</h4>
                <span class="critical-service-status ${service.status}">
                    <i class="fas fa-${service.status === STATUS.UP ? 'check-circle' : 'times-circle'}"></i>
                    ${service.status === STATUS.UP ? 'Activo' : 'Caído'}
                </span>
            </div>
            <div class="critical-service-info">
                <p><i class="fas fa-network-wired"></i> IP: ${service.ip}</p>
                <p><i class="fas fa-building"></i> Depto: ${service.department}</p>
                <p><i class="fas fa-clock"></i> Última verificación: ${service.lastCheck}</p>
            </div>
            <div class="critical-service-actions">
                <button class="btn-toggle-status ${service.status}" 
                        onclick="toggleCriticalServiceStatus('${service.id}')">
                    <i class="fas fa-${service.status === STATUS.UP ? 'arrow-down' : 'arrow-up'}"></i>
                    ${service.status === STATUS.UP ? 'Marcar Caído' : 'Restaurar'}
                </button>
                <button class="btn-edit" onclick="editCriticalService('${service.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function toggleCriticalServiceStatus(id) {
    updateData(data => {
        const service = data.criticalServices.find(s => s.id == id);
        if (service) {
            const newStatus = service.status === STATUS.UP ? STATUS.DOWN : STATUS.UP;
            service.status = newStatus;
            service.lastCheck = getCurrentTime();
            
            if (newStatus === STATUS.DOWN) {
                showToast(`⚠️ ALERTA: ${service.name} está fuera de línea!`, 'error');
                addNotification({
                    type: 'danger',
                    title: 'Servicio caído',
                    message: `${service.name} (${service.ip})`
                });
            } else {
                showToast(`${service.name} ha sido restaurado`, 'success');
                addNotification({
                    type: 'success',
                    title: 'Servicio restaurado',
                    message: `${service.name} está funcionando`
                });
            }
        }
    });
}

function notifyAllDepartments() {
    const data = getData();
    const downServices = data.criticalServices.filter(s => s.status === STATUS.DOWN);
    
    if (downServices.length === 0) {
        showToast('No hay servicios caídos para reportar', 'warning');
        return;
    }
    
    const message = `EMERGENCIA: Los siguientes servicios están caídos:\n\n` +
        downServices.map(s => `• ${s.name} (${s.ip}) - ${s.department}`).join('\n') +
        `\n\nPor favor tomar acción inmediata.`;
    
    alert(message);
    showToast('Notificación enviada a todos los departamentos', 'success');
    
    addNotification({
        type: 'warning',
        title: 'Notificación de emergencia enviada',
        message: `${downServices.length} servicio(s) caído(s) notificado(s)`
    });
}

// ============================================
// NOTIFICACIONES
// ============================================

function addNotification(notification) {
    let notifications = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]');
    notifications.unshift({
        ...notification,
        time: new Date().toLocaleTimeString(),
        date: getTodayDate(),
        read: false
    });
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications.slice(0, 50)));
}

function showNotifications() {
    const panel = document.getElementById('notifications-panel');
    panel.classList.toggle('active');
    
    if (panel.classList.contains('active')) {
        renderNotifications();
    }
}

function renderNotifications() {
    const notifications = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]');
    const container = document.getElementById('notifications-list');
    
    if (notifications.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bell-slash"></i>
                <p>No hay notificaciones</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = notifications.map(n => `
        <div class="notification-item ${n.type} ${n.read ? '' : 'unread'}">
            <div class="notification-icon ${n.type}">
                <i class="fas fa-${n.type === 'danger' ? 'exclamation-triangle' : n.type === 'warning' ? 'exclamation-circle' : n.type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            </div>
            <div class="notification-content">
                <h4 class="notification-title">${n.title}</h4>
                <p class="notification-message">${n.message}</p>
                <span class="notification-time">${n.time}</span>
            </div>
        </div>
    `).join('');
}

function markAllRead() {
    let notifications = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]');
    notifications = notifications.map(n => ({ ...n, read: true }));
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
    renderNotifications();
    showToast('Todas las notificaciones marcadas como leídas', 'success');
}

// ============================================
// MODALES
// ============================================

function openModal(type) {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    let formHtml = '';
    
    switch(type) {
        case 'meeting':
            title.textContent = 'Nueva Reunión';
            formHtml = getMeetingForm();
            break;
        case 'assignment':
            title.textContent = 'Nueva Asignación';
            formHtml = getAssignmentForm();
            break;
        case 'request':
            title.textContent = 'Nueva Solicitud';
            formHtml = getRequestForm();
            break;
        case 'client':
            title.textContent = 'Nueva Necesidad de Cliente';
            formHtml = getClientForm();
            break;
        case 'todo':
            title.textContent = 'Nueva Tarea';
            formHtml = getTodoForm();
            break;
        case 'service':
            title.textContent = 'Nuevo Servicio';
            formHtml = getServiceForm();
            break;
        case 'critical-service':
            title.textContent = 'Agregar Servicio Crítico';
            formHtml = getCriticalServiceForm();
            break;
    }
    
    body.innerHTML = formHtml;
    overlay.classList.add('active');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}

// Cerrar modal al hacer click fuera
document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// ============================================
// FORMULARIOS
// ============================================

function getMeetingForm() {
    return `
        <form id="meeting-form" onsubmit="saveMeeting(event)">
            <div class="form-group">
                <label>Título de la Reunión</label>
                <input type="text" name="title" required placeholder="Ej: Reunión de seguimiento">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Fecha</label>
                    <input type="date" name="date" required value="${getTodayDate()}">
                </div>
                <div class="form-group">
                    <label>Hora</label>
                    <input type="time" name="time" required value="09:00">
                </div>
            </div>
            <div class="form-group">
                <label>Duración (minutos)</label>
                <input type="number" name="duration" required value="60" min="15" step="15">
            </div>
            <div class="form-group">
                <label>Participantes</label>
                <input type="text" name="participants" required placeholder="Ej: Equipo de desarrollo">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea name="description" placeholder="Detalles de la reunión"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Guardar</button>
            </div>
        </form>
    `;
}

function getAssignmentForm() {
    const data = getData();
    const employees = [...new Set(data.assignments.map(a => a.employee))];
    
    return `
        <form id="assignment-form" onsubmit="saveAssignment(event)">
            <div class="form-group">
                <label>Título de la Asignación</label>
                <input type="text" name="title" required placeholder="Ej: Desarrollar módulo de login">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Empleado</label>
                    <input type="text" name="employee" required list="employees-list" placeholder="Seleccionar o escribir">
                    <datalist id="employees-list">
                        ${employees.map(e => `<option value="${e}">`).join('')}
                    </datalist>
                </div>
                <div class="form-group">
                    <label>Departamento</label>
                    <input type="text" name="department" required placeholder="Ej: Desarrollo">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Estado</label>
                    <select name="status" required>
                        <option value="${STATUS.PENDING}">Pendiente</option>
                        <option value="${STATUS.IN_PROGRESS}">En Progreso</option>
                        <option value="${STATUS.COMPLETED}">Completado</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Prioridad</label>
                    <select name="priority" required>
                        <option value="${PRIORITY.HIGH}">Alta</option>
                        <option value="${PRIORITY.MEDIUM}">Media</option>
                        <option value="${PRIORITY.LOW}">Baja</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Fecha Límite</label>
                <input type="date" name="dueDate" required value="${getFutureDate(7)}">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea name="description" placeholder="Detalles de la asignación"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Guardar</button>
            </div>
        </form>
    `;
}

function getRequestForm() {
    const data = getData();
    const departments = [...new Set(data.requests.departments.map(r => r.department))];
    const employees = [...new Set(data.requests.employees.map(r => r.recipient))];
    
    return `
        <form id="request-form" onsubmit="saveRequest(event)">
            <div class="form-group">
                <label>Tipo de Solicitud</label>
                <select name="recipientType" id="recipient-type" onchange="toggleRecipientField()">
                    <option value="employees">A Empleado</option>
                    <option value="departments">A Departamento</option>
                </select>
            </div>
            <div class="form-group" id="recipient-field">
                <label>Empleado</label>
                <input type="text" name="recipient" list="employees-list" placeholder="Seleccionar o escribir">
                <datalist id="employees-list">
                    ${employees.map(e => `<option value="${e}">`).join('')}
                </datalist>
            </div>
            <div class="form-group" id="department-field" style="display:none;">
                <label>Departamento</label>
                <input type="text" name="department" list="departments-list" placeholder="Seleccionar o escribir">
                <datalist id="departments-list">
                    ${departments.map(d => `<option value="${d}">`).join('')}
                </datalist>
            </div>
            <div class="form-group">
                <label>Tipo de Solicitud</label>
                <select name="requestType" required>
                    <option value="Equipo">Equipo</option>
                    <option value="Acceso">Acceso</option>
                    <option value="Soporte">Soporte</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                    <option value="Infraestructura">Infraestructura</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>
            <div class="form-group">
                <label>Título</label>
                <input type="text" name="title" required placeholder="Ej: Solicitud de laptop">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea name="description" placeholder="Detalles de la solicitud"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Guardar</button>
            </div>
        </form>
    `;
}

function toggleRecipientField() {
    const type = document.getElementById('recipient-type').value;
    document.getElementById('recipient-field').style.display = type === 'employees' ? 'block' : 'none';
    document.getElementById('department-field').style.display = type === 'departments' ? 'block' : 'none';
}

function getClientForm() {
    return `
        <form id="client-form" onsubmit="saveClient(event)">
            <div class="form-group">
                <label>Nombre del Cliente/Empresa</label>
                <input type="text" name="name" required placeholder="Ej: Empresa ABC">
            </div>
            <div class="form-group">
                <label>Persona de Contacto</label>
                <input type="text" name="contact" required placeholder="Nombre del contacto">
            </div>
            <div class="form-group">
                <label>Necesidad</label>
                <input type="text" name="need" required placeholder="Ej: Implementación de sistema">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Prioridad</label>
                    <select name="priority" required>
                        <option value="${PRIORITY.HIGH}">Alta</option>
                        <option value="${PRIORITY.MEDIUM}">Media</option>
                        <option value="${PRIORITY.LOW}">Baja</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Estado</label>
                    <select name="status" required>
                        <option value="${STATUS.PENDING}">Pendiente</option>
                        <option value="${STATUS.IN_ATTENTION}">En Atención</option>
                        <option value="${STATUS.ATTENDED}">Atendido</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea name="description" placeholder="Detalles de la necesidad"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Guardar</button>
            </div>
        </form>
    `;
}

function getTodoForm() {
    return `
        <form id="todo-form" onsubmit="saveTodo(event)">
            <div class="form-group">
                <label>Tarea</label>
                <input type="text" name="title" required placeholder="Ej: Revisar presupuesto">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Prioridad</label>
                    <select name="priority" required>
                        <option value="${PRIORITY.HIGH}">Alta</option>
                        <option value="${PRIORITY.MEDIUM}">Media</option>
                        <option value="${PRIORITY.LOW}">Baja</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Fecha Límite</label>
                    <input type="date" name="dueDate" required value="${getTomorrowDate()}">
                </div>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Guardar</button>
            </div>
        </form>
    `;
}

function getServiceForm() {
    return `
        <form id="service-form" onsubmit="saveService(event)">
            <div class="form-group">
                <label>Nombre del Servicio</label>
                <input type="text" name="name" required placeholder="Ej: Hosting AWS">
            </div>
            <div class="form-group">
                <label>Proveedor</label>
                <input type="text" name="provider" required placeholder="Ej: Amazon Web Services">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Fecha de Inicio</label>
                    <input type="date" name="startDate" required value="${getPastDate(30)}">
                </div>
                <div class="form-group">
                    <label>Fecha de Vencimiento</label>
                    <input type="date" name="endDate" required value="${getFutureDate(60)}">
                </div>
            </div>
            <div class="form-group">
                <label>Costo (mensual/anual)</label>
                <input type="number" name="cost" required placeholder="Ej: 250" step="0.01">
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Guardar</button>
            </div>
        </form>
    `;
}

function getCriticalServiceForm() {
    return `
        <form id="critical-service-form" onsubmit="saveCriticalService(event)">
            <div class="form-group">
                <label>Nombre del Servicio</label>
                <input type="text" name="name" required placeholder="Ej: Servidor Principal">
            </div>
            <div class="form-group">
                <label>Dirección IP</label>
                <input type="text" name="ip" required placeholder="Ej: 192.168.1.100">
            </div>
            <div class="form-group">
                <label>Departamento Responsable</label>
                <input type="text" name="department" required placeholder="Ej: Infraestructura">
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Guardar</button>
            </div>
        </form>
    `;
}

// ============================================
// GUARDAR DATOS DESDE FORMULARIOS
// ============================================

function saveMeeting(e) {
    e.preventDefault();
    const form = e.target;
    const data = getData();
    
    data.meetings.push({
        id: generateId(),
        title: form.title.value,
        date: form.date.value,
        time: form.time.value,
        duration: parseInt(form.duration.value),
        participants: form.participants.value,
        description: form.description.value
    });
    
    saveData(data);
    closeModal();
    refreshAllModules();
    showToast('Reunión guardada correctamente', 'success');
}

function saveAssignment(e) {
    e.preventDefault();
    const form = e.target;
    const data = getData();
    
    data.assignments.push({
        id: generateId(),
        title: form.title.value,
        employee: form.employee.value,
        department: form.department.value,
        status: form.status.value,
        priority: form.priority.value,
        description: form.description.value,
        dueDate: form.dueDate.value
    });
    
    saveData(data);
    closeModal();
    refreshAllModules();
    showToast('Asignación guardada correctamente', 'success');
}

function saveRequest(e) {
    e.preventDefault();
    const form = e.target;
    const data = getData();
    const type = form.recipientType.value;
    
    const newRequest = {
        id: generateId(),
        title: form.title.value,
        type: form.requestType.value,
        status: 'enviada',
        description: form.description.value,
        date: getTodayDate()
    };
    
    if (type === 'employees') {
        newRequest.recipient = form.recipient.value;
        data.requests.employees.push(newRequest);
    } else {
        newRequest.department = form.department.value;
        data.requests.departments.push(newRequest);
    }
    
    saveData(data);
    closeModal();
    refreshAllModules();
    showToast('Solicitud guardada correctamente', 'success');
}

function saveClient(e) {
    e.preventDefault();
    const form = e.target;
    const data = getData();
    
    data.clients.push({
        id: generateId(),
        name: form.name.value,
        contact: form.contact.value,
        need: form.need.value,
        priority: form.priority.value,
        status: form.status.value,
        description: form.description.value,
        date: getTodayDate()
    });
    
    saveData(data);
    closeModal();
    refreshAllModules();
    showToast('Cliente guardado correctamente', 'success');
}

function saveTodo(e) {
    e.preventDefault();
    const form = e.target;
    const data = getData();
    
    data.todos.push({
        id: generateId(),
        title: form.title.value,
        priority: form.priority.value,
        dueDate: form.dueDate.value,
        completed: false
    });
    
    saveData(data);
    closeModal();
    refreshAllModules();
    showToast('Tarea guardada correctamente', 'success');
}

function saveService(e) {
    e.preventDefault();
    const form = e.target;
    const data = getData();
    
    data.services.push({
        id: generateId(),
        name: form.name.value,
        provider: form.provider.value,
        startDate: form.startDate.value,
        endDate: form.endDate.value,
        cost: parseFloat(form.cost.value)
    });
    
    saveData(data);
    closeModal();
    refreshAllModules();
    showToast('Servicio guardado correctamente', 'success');
}

function saveCriticalService(e) {
    e.preventDefault();
    const form = e.target;
    const data = getData();
    
    data.criticalServices.push({
        id: generateId(),
        name: form.name.value,
        ip: form.ip.value,
        department: form.department.value,
        status: STATUS.UP,
        lastCheck: getCurrentTime()
    });
    
    saveData(data);
    closeModal();
    refreshAllModules();
    showToast('Servicio crítico agregado correctamente', 'success');
}

// ============================================
// FUNCIONES DE EDICIÓN Y ELIMINACIÓN
// ============================================

function editMeeting(id) {
    const data = getData();
    const meeting = data.meetings.find(m => m.id == id);
    if (!meeting) return;
    
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.textContent = 'Editar Reunión';
    body.innerHTML = `
        <form id="meeting-form-edit" onsubmit="updateMeeting(event, '${id}')">
            <div class="form-group">
                <label>Título de la Reunión</label>
                <input type="text" name="title" required value="${meeting.title}">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Fecha</label>
                    <input type="date" name="date" required value="${meeting.date}">
                </div>
                <div class="form-group">
                    <label>Hora</label>
                    <input type="time" name="time" required value="${meeting.time}">
                </div>
            </div>
            <div class="form-group">
                <label>Duración (minutos)</label>
                <input type="number" name="duration" required value="${meeting.duration}" min="15" step="15">
            </div>
            <div class="form-group">
                <label>Participantes</label>
                <input type="text" name="participants" required value="${meeting.participants}">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea name="description">${meeting.description}</textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn-primary">Guardar Cambios</button>
            </div>
        </form>
    `;
    overlay.classList.add('active');
}

function updateMeeting(e, id) {
    e.preventDefault();
    const form = e.target;
    updateData(data => {
        const meeting = data.meetings.find(m => m.id == id);
        if (meeting) {
            meeting.title = form.title.value;
            meeting.date = form.date.value;
            meeting.time = form.time.value;
            meeting.duration = parseInt(form.duration.value);
            meeting.participants = form.participants.value;
            meeting.description = form.description.value;
        }
    });
    closeModal();
    showToast('Reunión actualizada correctamente', 'success');
}

function deleteMeeting(id) {
    if (confirm('¿Estás seguro de eliminar esta reunión?')) {
        updateData(data => {
            data.meetings = data.meetings.filter(m => m.id != id);
            showToast('Reunión eliminada', 'success');
        });
    }
}

function editAssignment(id) {
    const data = getData();
    const assignment = data.assignments.find(a => a.id == id);
    if (!assignment) return;
    
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const employees = [...new Set(data.assignments.map(a => a.employee))];
    
    title.textContent = 'Editar Asignación';
    body.innerHTML = `
        <form id="assignment-form-edit" onsubmit="updateAssignment(event, '${id}')">
            <div class="form-group">
                <label>Título de la Asignación</label>
                <input type="text" name="title" required value="${assignment.title}">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Empleado</label>
                    <input type="text" name="employee" required value="${assignment.employee}" list="employees-list-edit">
                    <datalist id="employees-list-edit">
                        ${employees.map(e => `<option value="${e}">`).join('')}
                    </datalist>
                </div>
                <div class="form-group">
                    <label>Departamento</label>
                    <input type="text" name="department" required value="${assignment.department}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Estado</label>
                    <select name="status" required>
                        <option value="${STATUS.PENDING}" ${assignment.status === STATUS.PENDING ? 'selected' : ''}>Pendiente</option>
                        <option value="${STATUS.IN_PROGRESS}" ${assignment.status === STATUS.IN_PROGRESS ? 'selected' : ''}>En Progreso</option>
                        <option value="${STATUS.COMPLETED}" ${assignment.status === STATUS.COMPLETED ? 'selected' : ''}>Completado</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Prioridad</label>
                    <select name="priority" required>
                        <option value="${PRIORITY.HIGH}" ${assignment.priority === PRIORITY.HIGH ? 'selected' : ''}>Alta</option>
                        <option value="${PRIORITY.MEDIUM}" ${assignment.priority === PRIORITY.MEDIUM ? 'selected' : ''}>Media</option>
                        <option value="${PRIORITY.LOW}" ${assignment.priority === PRIORITY.LOW ? 'selected' : ''}>Baja</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Fecha Límite</label>
                <input type="date" name="dueDate" required value="${assignment.dueDate}">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea name="description">${assignment.description}</textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="button" class="btn-danger" onclick="deleteAssignment('${id}')">Eliminar</button>
                <button type="submit" class="btn-primary">Guardar Cambios</button>
            </div>
        </form>
    `;
    overlay.classList.add('active');
}

function updateAssignment(e, id) {
    e.preventDefault();
    const form = e.target;
    updateData(data => {
        const assignment = data.assignments.find(a => a.id == id);
        if (assignment) {
            assignment.title = form.title.value;
            assignment.employee = form.employee.value;
            assignment.department = form.department.value;
            assignment.status = form.status.value;
            assignment.priority = form.priority.value;
            assignment.dueDate = form.dueDate.value;
            assignment.description = form.description.value;
        }
    });
    closeModal();
    showToast('Asignación actualizada correctamente', 'success');
}

function deleteAssignment(id) {
    if (confirm('¿Estás seguro de eliminar esta asignación?')) {
        updateData(data => {
            data.assignments = data.assignments.filter(a => a.id != id);
            showToast('Asignación eliminada', 'success');
        });
        closeModal();
    }
}

function editRequest(id) {
    const data = getData();
    const requests = currentRequestTab === 'employees' ? data.requests.employees : data.requests.departments;
    const request = requests.find(r => r.id == id);
    if (!request) return;
    
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const departments = [...new Set(data.requests.departments.map(r => r.department))];
    const employees = [...new Set(data.requests.employees.map(r => r.recipient))];
    
    title.textContent = 'Editar Solicitud';
    body.innerHTML = `
        <form id="request-form-edit" onsubmit="updateRequest(event, '${id}')">
            <div class="form-group">
                <label>Tipo de Solicitud</label>
                <select name="recipientType" id="recipient-type-edit" onchange="toggleRecipientFieldEdit()">
                    <option value="employees" ${currentRequestTab === 'employees' ? 'selected' : ''}>A Empleado</option>
                    <option value="departments" ${currentRequestTab === 'departments' ? 'selected' : ''}>A Departamento</option>
                </select>
            </div>
            <div class="form-group" id="recipient-field-edit">
                <label>Empleado</label>
                <input type="text" name="recipient" value="${currentRequestTab === 'employees' ? request.recipient : ''}" list="employees-list-edit">
                <datalist id="employees-list-edit">
                    ${employees.map(e => `<option value="${e}">`).join('')}
                </datalist>
            </div>
            <div class="form-group" id="department-field-edit" style="display:${currentRequestTab === 'departments' ? 'block' : 'none'};">
                <label>Departamento</label>
                <input type="text" name="department" value="${currentRequestTab === 'departments' ? request.department : ''}" list="departments-list-edit">
                <datalist id="departments-list-edit">
                    ${departments.map(d => `<option value="${d}">`).join('')}
                </datalist>
            </div>
            <div class="form-group">
                <label>Tipo</label>
                <select name="requestType" required>
                    <option value="Equipo" ${request.type === 'Equipo' ? 'selected' : ''}>Equipo</option>
                    <option value="Acceso" ${request.type === 'Acceso' ? 'selected' : ''}>Acceso</option>
                    <option value="Soporte" ${request.type === 'Soporte' ? 'selected' : ''}>Soporte</option>
                    <option value="Mantenimiento" ${request.type === 'Mantenimiento' ? 'selected' : ''}>Mantenimiento</option>
                    <option value="Infraestructura" ${request.type === 'Infraestructura' ? 'selected' : ''}>Infraestructura</option>
                    <option value="Otro" ${request.type === 'Otro' ? 'selected' : ''}>Otro</option>
                </select>
            </div>
            <div class="form-group">
                <label>Estado</label>
                <select name="status" required>
                    <option value="${STATUS.SENT}" ${request.status === STATUS.SENT ? 'selected' : ''}>Enviada</option>
                    <option value="${STATUS.IN_PROCESS}" ${request.status === STATUS.IN_PROCESS ? 'selected' : ''}>En Proceso</option>
                    <option value="${STATUS.COMPLETED}" ${request.status === STATUS.COMPLETED ? 'selected' : ''}>Completada</option>
                </select>
            </div>
            <div class="form-group">
                <label>Título</label>
                <input type="text" name="title" required value="${request.title}">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea name="description">${request.description}</textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="button" class="btn-danger" onclick="deleteRequest('${id}')">Eliminar</button>
                <button type="submit" class="btn-primary">Guardar Cambios</button>
            </div>
        </form>
    `;
    overlay.classList.add('active');
}

function toggleRecipientFieldEdit() {
    const type = document.getElementById('recipient-type-edit').value;
    document.getElementById('recipient-field-edit').style.display = type === 'employees' ? 'block' : 'none';
    document.getElementById('department-field-edit').style.display = type === 'departments' ? 'block' : 'none';
}

function updateRequest(e, id) {
    e.preventDefault();
    const form = e.target;
    updateData(data => {
        const type = form.recipientType.value;
        const requests = type === 'employees' ? data.requests.employees : data.requests.departments;
        const request = requests.find(r => r.id == id);
        if (request) {
            request.title = form.title.value;
            request.type = form.requestType.value;
            request.status = form.status.value;
            request.description = form.description.value;
            if (type === 'employees') {
                request.recipient = form.recipient.value;
            } else {
                request.department = form.department.value;
            }
        }
    });
    closeModal();
    showToast('Solicitud actualizada correctamente', 'success');
}

function deleteRequest(id) {
    if (confirm('¿Estás seguro de eliminar esta solicitud?')) {
        updateData(data => {
            if (currentRequestTab === 'employees') {
                data.requests.employees = data.requests.employees.filter(r => r.id != id);
            } else {
                data.requests.departments = data.requests.departments.filter(r => r.id != id);
            }
            showToast('Solicitud eliminada', 'success');
        });
        closeModal();
    }
}

function editClient(id) {
    const data = getData();
    const client = data.clients.find(c => c.id == id);
    if (!client) return;
    
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.textContent = 'Editar Cliente';
    body.innerHTML = `
        <form id="client-form-edit" onsubmit="updateClient(event, '${id}')">
            <div class="form-group">
                <label>Nombre del Cliente/Empresa</label>
                <input type="text" name="name" required value="${client.name}">
            </div>
            <div class="form-group">
                <label>Persona de Contacto</label>
                <input type="text" name="contact" required value="${client.contact}">
            </div>
            <div class="form-group">
                <label>Necesidad</label>
                <input type="text" name="need" required value="${client.need}">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Prioridad</label>
                    <select name="priority" required>
                        <option value="${PRIORITY.HIGH}" ${client.priority === PRIORITY.HIGH ? 'selected' : ''}>Alta</option>
                        <option value="${PRIORITY.MEDIUM}" ${client.priority === PRIORITY.MEDIUM ? 'selected' : ''}>Media</option>
                        <option value="${PRIORITY.LOW}" ${client.priority === PRIORITY.LOW ? 'selected' : ''}>Baja</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Estado</label>
                    <select name="status" required>
                        <option value="${STATUS.PENDING}" ${client.status === STATUS.PENDING ? 'selected' : ''}>Pendiente</option>
                        <option value="${STATUS.IN_ATTENTION}" ${client.status === STATUS.IN_ATTENTION ? 'selected' : ''}>En Atención</option>
                        <option value="${STATUS.ATTENDED}" ${client.status === STATUS.ATTENDED ? 'selected' : ''}>Atendido</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea name="description">${client.description}</textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="button" class="btn-danger" onclick="deleteClient('${id}')">Eliminar</button>
                <button type="submit" class="btn-primary">Guardar Cambios</button>
            </div>
        </form>
    `;
    overlay.classList.add('active');
}

function updateClient(e, id) {
    e.preventDefault();
    const form = e.target;
    updateData(data => {
        const client = data.clients.find(c => c.id == id);
        if (client) {
            client.name = form.name.value;
            client.contact = form.contact.value;
            client.need = form.need.value;
            client.priority = form.priority.value;
            client.status = form.status.value;
            client.description = form.description.value;
        }
    });
    closeModal();
    showToast('Cliente actualizado correctamente', 'success');
}

function deleteClient(id) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
        updateData(data => {
            data.clients = data.clients.filter(c => c.id != id);
            showToast('Cliente eliminado', 'success');
        });
        closeModal();
    }
}

function editTodo(id) {
    const data = getData();
    const todo = data.todos.find(t => t.id == id);
    if (!todo) return;
    
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.textContent = 'Editar Tarea';
    body.innerHTML = `
        <form id="todo-form-edit" onsubmit="updateTodo(event, '${id}')">
            <div class="form-group">
                <label>Tarea</label>
                <input type="text" name="title" required value="${todo.title}">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Prioridad</label>
                    <select name="priority" required>
                        <option value="${PRIORITY.HIGH}" ${todo.priority === PRIORITY.HIGH ? 'selected' : ''}>Alta</option>
                        <option value="${PRIORITY.MEDIUM}" ${todo.priority === PRIORITY.MEDIUM ? 'selected' : ''}>Media</option>
                        <option value="${PRIORITY.LOW}" ${todo.priority === PRIORITY.LOW ? 'selected' : ''}>Baja</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Fecha Límite</label>
                    <input type="date" name="dueDate" required value="${todo.dueDate}">
                </div>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" name="completed" ${todo.completed ? 'checked' : ''}> Marcada como completada
                </label>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="button" class="btn-danger" onclick="deleteTodo('${id}')">Eliminar</button>
                <button type="submit" class="btn-primary">Guardar Cambios</button>
            </div>
        </form>
    `;
    overlay.classList.add('active');
}

function updateTodo(e, id) {
    e.preventDefault();
    const form = e.target;
    updateData(data => {
        const todo = data.todos.find(t => t.id == id);
        if (todo) {
            todo.title = form.title.value;
            todo.priority = form.priority.value;
            todo.dueDate = form.dueDate.value;
            todo.completed = form.completed.checked;
        }
    });
    closeModal();
    showToast('Tarea actualizada correctamente', 'success');
}

function editService(id) {
    const data = getData();
    const service = data.services.find(s => s.id == id);
    if (!service) return;
    
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.textContent = 'Editar Servicio';
    body.innerHTML = `
        <form id="service-form-edit" onsubmit="updateService(event, '${id}')">
            <div class="form-group">
                <label>Nombre del Servicio</label>
                <input type="text" name="name" required value="${service.name}">
            </div>
            <div class="form-group">
                <label>Proveedor</label>
                <input type="text" name="provider" required value="${service.provider}">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Fecha de Inicio</label>
                    <input type="date" name="startDate" required value="${service.startDate}">
                </div>
                <div class="form-group">
                    <label>Fecha de Vencimiento</label>
                    <input type="date" name="endDate" required value="${service.endDate}">
                </div>
            </div>
            <div class="form-group">
                <label>Costo (mensual/anual)</label>
                <input type="number" name="cost" required value="${service.cost}" step="0.01">
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="button" class="btn-danger" onclick="deleteService('${id}')">Eliminar</button>
                <button type="submit" class="btn-primary">Guardar Cambios</button>
            </div>
        </form>
    `;
    overlay.classList.add('active');
}

function updateService(e, id) {
    e.preventDefault();
    const form = e.target;
    updateData(data => {
        const service = data.services.find(s => s.id == id);
        if (service) {
            service.name = form.name.value;
            service.provider = form.provider.value;
            service.startDate = form.startDate.value;
            service.endDate = form.endDate.value;
            service.cost = parseFloat(form.cost.value);
        }
    });
    closeModal();
    showToast('Servicio actualizado correctamente', 'success');
}

function deleteService(id) {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
        updateData(data => {
            data.services = data.services.filter(s => s.id != id);
            showToast('Servicio eliminado', 'success');
        });
        closeModal();
    }
}

function deleteServiceFromList(id) {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
        updateData(data => {
            data.services = data.services.filter(s => s.id != id);
            showToast('Servicio eliminado', 'success');
        });
    }
}

function editCriticalService(id) {
    const data = getData();
    const service = data.criticalServices.find(s => s.id == id);
    if (!service) return;
    
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.textContent = 'Editar Servicio Crítico';
    body.innerHTML = `
        <form id="critical-service-form-edit" onsubmit="updateCriticalService(event, '${id}')">
            <div class="form-group">
                <label>Nombre del Servicio</label>
                <input type="text" name="name" required value="${service.name}">
            </div>
            <div class="form-group">
                <label>Dirección IP</label>
                <input type="text" name="ip" required value="${service.ip}">
            </div>
            <div class="form-group">
                <label>Departamento Responsable</label>
                <input type="text" name="department" required value="${service.department}">
            </div>
            <div class="form-group">
                <label>Estado</label>
                <select name="status" required>
                    <option value="${STATUS.UP}" ${service.status === STATUS.UP ? 'selected' : ''}>Activo</option>
                    <option value="${STATUS.DOWN}" ${service.status === STATUS.DOWN ? 'selected' : ''}>Caído</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="button" class="btn-danger" onclick="deleteCriticalService('${id}')">Eliminar</button>
                <button type="submit" class="btn-primary">Guardar Cambios</button>
            </div>
        </form>
    `;
    overlay.classList.add('active');
}

function updateCriticalService(e, id) {
    e.preventDefault();
    const form = e.target;
    updateData(data => {
        const service = data.criticalServices.find(s => s.id == id);
        if (service) {
            service.name = form.name.value;
            service.ip = form.ip.value;
            service.department = form.department.value;
            service.status = form.status.value;
            service.lastCheck = getCurrentTime();
        }
    });
    closeModal();
    showToast('Servicio crítico actualizado correctamente', 'success');
}

function deleteCriticalService(id) {
    if (confirm('¿Estás seguro de eliminar este servicio crítico?')) {
        updateData(data => {
            data.criticalServices = data.criticalServices.filter(s => s.id != id);
            showToast('Servicio crítico eliminado', 'success');
        });
        closeModal();
    }
}

// ============================================
// UTILIDADES DE FORMATO
// ============================================

function formatStatus(status) {
    const statusMap = {
        [STATUS.PENDING]: 'Pendiente',
        [STATUS.IN_PROGRESS]: 'En Progreso',
        [STATUS.COMPLETED]: 'Completado',
        [STATUS.SENT]: 'Enviada',
        [STATUS.IN_PROCESS]: 'En Proceso',
        // 'completada' es igual a 'completado', se puede unificar
        [STATUS.IN_ATTENTION]: 'En Atención',
        [STATUS.ATTENDED]: 'Atendido'
    };
    return statusMap[status] || status;
}

function formatServiceStatus(status) {
    const statusMap = {
        'normal': 'Normal',
        'expiring': 'Por Vencer',
        'expired': 'Vencido'
    };
    return statusMap[status] || status;
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconMap = {
        'success': 'check-circle',
        'warning': 'exclamation-circle',
        'error': 'times-circle',
        'info': 'info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas fa-${iconMap[type]} toast-icon"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(toast);
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}
