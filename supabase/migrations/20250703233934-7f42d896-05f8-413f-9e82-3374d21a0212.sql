
-- Insertar planes de suscripción
INSERT INTO public.planes (nombre, precio, categoria, descripcion, entradas, horario) VALUES
('Básico', 135.00, 'monthly', 'Acceso 3 veces por semana', 31, 'completo'),
('Regular', 160.00, 'monthly', 'Acceso completo al gimnasio y máquinas', 31, 'completo'),
('Premium', 200.00, 'monthly', 'Acceso completo más clases complementarias', 90, 'completo'),
('Mensual, solo mañanas', 160.00, 'monthly', 'Acceso completo solo en horario de mañanas', 31, 'mañanas'),
('Mensual, día por medio', 120.00, 'monthly', 'Acceso día por medio', 12, 'completo'),
('Temporal', 50.00, 'special', 'Eventos especiales y clases', 90, 'completo');

-- Insertar clientes
INSERT INTO public.clientes (nombre, apellido, correo, telefono, codigo, activo) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', '70123456', '123456', true),
('Maria', 'Garcia', 'maria.garcia@email.com', '70234567', '789012', true),
('Carlos', 'Rodriguez', 'carlos.rodriguez@email.com', '70345678', '345678', true),
('Ana', 'Martinez', 'ana.martinez@email.com', '70456789', '901234', true),
('Luis', 'Fernandez', 'luis.fernandez@email.com', '70567890', '567890', true),
('Sofia', 'Morales', 'sofia.morales@email.com', '70678901', '234567', true),
('Diego', 'Sanchez', 'diego.sanchez@email.com', '70789012', '678901', true),
('Laura', 'Gutierrez', 'laura.gutierrez@email.com', '70890123', '112233', true),
('Roberto', 'Silva', 'roberto.silva@email.com', '70901234', '445566', true);

-- Insertar suscripciones (algunas activas, algunas expiradas, al menos una que expire el 3 de agosto de 2025)
INSERT INTO public.suscripciones (cliente_id, plan_id, fecha_inicio, fecha_fin, estado) VALUES
-- Suscripciones activas
(1, 1, '2025-05-15', '2025-08-15', 'Activo'),  -- Juan Pérez - Básico
(2, 3, '2025-05-10', '2025-08-20', 'Activo'),  -- Maria Garcia - Premium
(3, 2, '2025-05-05', '2025-08-25', 'Activo'),  -- Carlos Rodriguez - Regular
(5, 3, '2025-05-01', '2025-09-01', 'Activo'),  -- Luis Fernandez - Premium
(6, 4, '2025-05-15', '2025-08-30', 'Activo'),  -- Sofia Morales - Solo mañanas
(7, 5, '2025-05-20', '2025-08-03', 'Activo'),  -- Diego Sanchez - Día por medio (EXPIRA EL 3 DE AGOSTO)
(8, 2, '2025-05-12', '2025-08-12', 'Activo'),  -- Laura Gutierrez - Regular
(9, 3, '2025-05-18', '2025-09-05', 'Activo'),  -- Roberto Silva - Premium
-- Suscripciones expiradas
(4, 1, '2025-02-20', '2025-03-20', 'Expirado'); -- Ana Martinez - Básico (expirada)
