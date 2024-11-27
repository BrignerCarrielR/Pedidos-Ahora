-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY, 
    usuario VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL, 
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    es_staff BOOLEAN DEFAULT FALSE
);

-- Tabla de tipos de comidas
CREATE TABLE tipos_comida (
    id SERIAL PRIMARY KEY, 
    tipo_nombre VARCHAR(100) NOT NULL UNIQUE
);
-- Tabla de menú de comidas
CREATE TABLE menu_comidas (
    id SERIAL PRIMARY KEY, 
    nombre_plato VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL, 
    disponible BOOLEAN DEFAULT TRUE, 
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_comida_id INT,
    imagen TEXT,  -- Columna para almacenar la imagen en base64
    CONSTRAINT fk_tipo_comida FOREIGN KEY (tipo_comida_id) REFERENCES tipos_comida(id)
);

-- Tabla de temporada
CREATE TABLE temporada (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tarifa DECIMAL(10, 2) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla de pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY, 
    id_usuario INT REFERENCES usuarios(id) ON DELETE CASCADE, 
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    estado VARCHAR(50) DEFAULT 'Pendiente', 
    total DECIMAL(10, 2) NOT NULL,
    comentario TEXT DEFAULT 'Sin comentario',
    id_temporada INT REFERENCES temporada(id) ON DELETE SET NULL
);


-- Tabla detalle_pedido
CREATE TABLE detalle_pedido (
    id SERIAL PRIMARY KEY,
    id_pedido INT REFERENCES pedidos(id) ON DELETE CASCADE, 
    id_menu_comida INT REFERENCES menu_comidas(id) ON DELETE CASCADE,  
    cantidad INT NOT NULL,  
    precio DECIMAL(10, 2) NOT NULL, 
    total DECIMAL(10, 2) NOT NULL 
);

-- Tabla carrito
CREATE TABLE carrito (
    id SERIAL PRIMARY KEY, 
    id_usuario INT REFERENCES usuarios(id) ON DELETE CASCADE, 
    estado VARCHAR(50) DEFAULT 'Activo',  -- Puede ser 'Activo', 'Vacío', 'Confirmado', etc.
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla detalle_carrito
CREATE TABLE detalle_carrito (
    id SERIAL PRIMARY KEY, 
    id_carrito INT REFERENCES carrito(id) ON DELETE CASCADE,  -- Relacionado con el carrito
    id_menu_comida INT REFERENCES menu_comidas(id) ON DELETE CASCADE,  -- Relacionado con el menú de comidas
    cantidad INT NOT NULL,  -- Cantidad de cada producto
    precio DECIMAL(10, 2) NOT NULL,  -- Precio del producto en el momento de agregarlo al carrito
    total DECIMAL(10, 2) NOT NULL  -- Total de la línea (cantidad * precio)
);

-- Tabla detalle_carrito
CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id) ON DELETE CASCADE, 
    id_plato INT REFERENCES menu_comidas(id) ON DELETE CASCADE,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_plato FOREIGN KEY (id_plato) REFERENCES menu_comidas(id) ON DELETE CASCADE,
    CONSTRAINT unique_favorito UNIQUE (id_usuario, id_plato) -- Asegura que un usuario no pueda agregar el mismo plato dos veces.
);


-- PROCEDIMIENTOS ALAMACENADOS
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
    v_id_temporada INT;
    v_tarifa DECIMAL(10, 2);
    detalle RECORD;
BEGIN
   -- Depuración: Verificar el valor del p_id_usuario
    RAISE NOTICE 'Usuario ID: %', p_id_usuario;

    -- Obtenemos el carrito activo del usuario
    SELECT id INTO v_id_carrito
    FROM carrito
    WHERE id_usuario = p_id_usuario AND estado = 'Activo';

    -- Si no hay carrito activo, lanzar un error
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No tienes un carrito activo.';
    END IF;

    -- Creamos un nuevo pedido
    INSERT INTO pedidos(id_usuario, total) 
    VALUES (p_id_usuario, 0) RETURNING id INTO v_id_pedido;

    -- Obtenemos el id de la temporada activa (si hay varias, tomamos una)
    SELECT id INTO v_id_temporada
    FROM temporada
    WHERE estado = TRUE
    LIMIT 1;

    -- Si no hay temporada activa, asignar NULL al pedido
    IF NOT FOUND THEN
        v_id_temporada := NULL;
    END IF;

    -- Copiamos los detalles del carrito a los detalles del pedido
    FOR detalle IN
        SELECT id_menu_comida, cantidad, precio, total
        FROM detalle_carrito
        WHERE id_carrito = v_id_carrito
    LOOP
        -- Insertamos cada detalle del carrito en detalle_pedido
        INSERT INTO detalle_pedido(id_pedido, id_menu_comida, cantidad, precio, total)
        VALUES (v_id_pedido, detalle.id_menu_comida, detalle.cantidad, detalle.precio, detalle.total);

        -- Sumamos el total del pedido
        v_total := v_total + detalle.total;
    END LOOP;

    -- Si hay una temporada activa, aplicar su tarifa al total
    IF v_id_temporada IS NOT NULL THEN
        -- Obtenemos la tarifa de la temporada activa
        SELECT tarifa INTO v_tarifa
        FROM temporada
        WHERE id = v_id_temporada;

        -- Aplicar la tarifa al total (ajustando el total con la tarifa)
        IF v_tarifa IS NOT NULL THEN
            v_total := v_total * (1 + v_tarifa / 100);
            -- Si necesitas depurar el valor de v_total, usa RAISE NOTICE
            RAISE NOTICE 'La tarifa aplicada: %, Total después de aplicar la tarifa: %', v_tarifa, v_total;
        END IF;
    END IF;

    -- Actualizamos el total del pedido con la tarifa aplicada
    UPDATE pedidos 
    SET total = v_total, id_temporada = v_id_temporada
    WHERE id = v_id_pedido;

    -- Cambiamos el estado del carrito a 'Confirmado'
    UPDATE carrito SET estado = 'Confirmado' WHERE id = v_id_carrito;

    -- Eliminamos los detalles del carrito
    DELETE FROM detalle_carrito WHERE id_carrito = v_id_carrito;
    
END;
$$;
