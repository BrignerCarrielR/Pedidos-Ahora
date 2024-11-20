-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY, 
    usuario VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL, 
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- Tabla de menú de comidas
CREATE TABLE menu_comidas (
    id SERIAL PRIMARY KEY, 
    nombre_plato VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL, 
    disponible BOOLEAN DEFAULT TRUE, 
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- Tabla de pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY, 
    id_usuario INT REFERENCES usuarios(id) ON DELETE CASCADE, 
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    estado VARCHAR(50) DEFAULT 'Pendiente', 
    total DECIMAL(10, 2) NOT NULL 
);

-- Tabla detalle_pedido
CREATE TABLE detalle_pedido (
    id SERIAL PRIMARY KEY,
    id_pedido INT REFERENCES pedidos(id) ON DELETE CASCADE, 
    id_menu_comida INT REFERENCES menu_comidas(id) ON DELETE CASCADE,  
    cantidad INT NOT NULL,  
    precio DECIMAL(10, 2) NOT NULL, posteriormente)
    total DECIMAL(10, 2) NOT NULL 
);

CREATE TABLE carrito (
    id SERIAL PRIMARY KEY, 
    id_usuario INT REFERENCES usuarios(id) ON DELETE CASCADE, 
    estado VARCHAR(50) DEFAULT 'Activo',  -- Puede ser 'Activo', 'Vacío', 'Confirmado', etc.
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE detalle_carrito (
    id SERIAL PRIMARY KEY, 
    id_carrito INT REFERENCES carrito(id) ON DELETE CASCADE,  -- Relacionado con el carrito
    id_menu_comida INT REFERENCES menu_comidas(id) ON DELETE CASCADE,  -- Relacionado con el menú de comidas
    cantidad INT NOT NULL,  -- Cantidad de cada producto
    precio DECIMAL(10, 2) NOT NULL,  -- Precio del producto en el momento de agregarlo al carrito
    total DECIMAL(10, 2) NOT NULL  -- Total de la línea (cantidad * precio)
);


INSERT INTO usuarios (nombre, correo, contrasena, telefono, direccion) 
VALUES 
('Yomaira Suarez', 'ysuarezr@unemi.edu.ec', 'yomasuarez', '0987654326', 'Vinces - Palizada'),
('Carlos Martínez', 'carlos.martinez@example.com', 'carlitos123', '0998765432', 'Quito - La Mariscal'),
('Laura Gómez', 'laura.gomez@example.com', 'laura2023', '0987112233', 'Guayaquil - Urdesa'),
('Pedro López', 'pedro.lopez@example.com', 'pedro1234', '0967445566', 'Cuenca - Centro');


INSERT INTO menu_comidas (nombre_plato, descripcion, precio, disponible)
VALUES
('Pollo al Horno', 'Pollo asado con papas y ensalada', 8.99, TRUE),
('Pizza Margherita', 'Pizza con tomate, queso y albahaca', 12.50, TRUE),
('Ensalada Caesar', 'Ensalada fresca con pollo, lechuga, croutons y aderezo César', 7.30, TRUE),
('Sopa de Mariscos', 'Sopa caliente con mariscos frescos', 10.00, FALSE),
('Hamburguesa Clásica', 'Hamburguesa con carne, queso, lechuga y tomate', 6.50, TRUE);


-- Nota: Asegúrate de que los usuarios que estás utilizando existen (por ejemplo, id_usuario = 1, 2, etc.)
INSERT INTO pedidos (id_usuario, total, estado) 
VALUES
(1, 26.79, 'Pendiente'),
(2, 19.80, 'Enviado'),
(3, 13.50, 'Entregado'),
(4, 22.40, 'Pendiente');

-- Nota: Asegúrate de que los pedidos a los que te refieres existen (por ejemplo, id_pedido = 1, 2, etc.)
INSERT INTO historial_pedidos (id_pedido, estado, comentario) 
VALUES
(1, 'En Preparación', 'El pedido está siendo preparado.'),
(2, 'Entregado', 'El pedido fue entregado correctamente.'),
(3, 'En Preparación', 'Estamos preparando la comida, pronto se enviará.'),
(4, 'Enviado', 'El pedido ha sido enviado y está en camino.');

INSERT INTO detalle_pedido (id_pedido, id_menu_comida, cantidad, precio, total)
VALUES
(1, 2, 1, 12.50, 12.50),  -- Pizza Margherita
(1, 1, 1, 8.99, 8.99),   -- Pollo al Horno
(1, 5, 1, 6.50, 6.50);   -- Hamburguesa Clásica

INSERT INTO detalle_pedido (id_pedido, id_menu_comida, cantidad, precio, total)
VALUES
(2, 2, 1, 12.50, 12.50),  -- Pizza Margherita
(2, 4, 1, 10.00, 10.00),  -- Sopa de Mariscos (disponible = FALSE, pero la incluimos)
(2, 3, 1, 7.30, 7.30);    -- Ensalada Caesar

INSERT INTO detalle_pedido (id_pedido, id_menu_comida, cantidad, precio, total)
VALUES
(3, 1, 1, 8.99, 8.99),  -- Pollo al Horno
(3, 3, 1, 7.30, 7.30);  -- Ensalada Caesar

INSERT INTO detalle_pedido (id_pedido, id_menu_comida, cantidad, precio, total)
VALUES
(4, 5, 2, 6.50, 13.00),  -- 2 Hamburguesas Clásicas
(4, 1, 1, 8.99, 8.99);   -- Pollo al Horno




CREATE OR REPLACE PROCEDURE agregar_al_carrito(p_id_usuario INT, p_id_menu_comida INT, p_cantidad INT)
LANGUAGE plpgsql
AS $$
DECLARE
    v_id_carrito INT;
    v_precio DECIMAL(10, 2);
    v_total DECIMAL(10, 2);
BEGIN
    -- verificamos si el usuario tiene un carrito activo
    SELECT id INTO v_id_carrito
    FROM carrito
    WHERE id_usuario = p_id_usuario AND estado = 'Activo';
    
    -- si no tiene carrito activo, crear uno nuevo
    IF NOT FOUND THEN
        INSERT INTO carrito(id_usuario, estado) VALUES (p_id_usuario, 'Activo') RETURNING id INTO v_id_carrito;
    END IF;

    -- obtenemos el precio del plato
    SELECT precio INTO v_precio
    FROM menu_comidas
    WHERE id = p_id_menu_comida;
    
    -- calculamos el total para la línea del carrito
    v_total := v_precio * p_cantidad;

    -- insertamos el detalle del producto en el carrito
    INSERT INTO detalle_carrito(id_carrito, id_menu_comida, cantidad, precio, total)
    VALUES (v_id_carrito, p_id_menu_comida, p_cantidad, v_precio, v_total);
    
END;
$$;



CREATE OR REPLACE PROCEDURE confirmar_pedido(p_id_usuario INT)
LANGUAGE plpgsql
AS $$
DECLARE
    v_id_carrito INT;
    v_total DECIMAL(10, 2) := 0;
    v_id_pedido INT;
    detalle RECORD;
BEGIN
    -- obtenemos el carrito activo del usuario
    SELECT id INTO v_id_carrito
    FROM carrito
    WHERE id_usuario = p_id_usuario AND estado = 'Activo';

    -- si no hay carrito activo, lanzar un error
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No tienes un carrito activo.';
    END IF;

    -- creamos un nuevo pedido
    INSERT INTO pedidos(id_usuario, total) 
    VALUES (p_id_usuario, 0) RETURNING id INTO v_id_pedido;

    -- copiamos los detalles del carrito a los detalles del pedido
    FOR detalle IN
        SELECT id_menu_comida, cantidad, precio, total
        FROM detalle_carrito
        WHERE id_carrito = v_id_carrito
    LOOP
        -- insertamos cada detalle del carrito en detalle_pedido
        INSERT INTO detalle_pedido(id_pedido, id_menu_comida, cantidad, precio, total)
        VALUES (v_id_pedido, detalle.id_menu_comida, detalle.cantidad, detalle.precio, detalle.total);

        -- sumamos el total del pedido
        v_total := v_total + detalle.total;
    END LOOP;

    -- actualizamos el total del pedido
    UPDATE pedidos SET total = v_total WHERE id = v_id_pedido;

    -- caambiamoss el estado del carrito a 'Confirmado'
    UPDATE carrito SET estado = 'Confirmado' WHERE id = v_id_carrito;

    -- eliminamos los detalles del carrito
    DELETE FROM detalle_carrito WHERE id_carrito = v_id_carrito;
    
END;
$$;