export const queries = {
    consultarTipoComidas:'select id, tipo_nombre from tipos_comida tc',

    consultarComidas: 'SELECT * FROM menu_comidas',
    consultarComida: 'SELECT * FROM menu_comidas WHERE id = $1',
    insertarComida: 'insert into menu_comidas (nombre_plato, descripcion, precio, disponible, tipo_comida_id, imagen) values ($1, $2, $3,  TRUE, $4, $5)',
    modificarComida: 'UPDATE menu_comidas SET nombre_plato = $1, descripcion = $2,disponible=$3, precio = $4, tipo_comida_id = $5, imagen = $6 WHERE id = $7;',

    consultarUsuarios: 'SELECT * FROM usuarios',
    consultarUsuario: 'SELECT * FROM usuarios WHERE id = $1',
    consultarInfoUsuario: 'SELECT id, usuario, contrasena, es_staff FROM usuarios WHERE usuario = $1',

    crearUsuario: 'insert into usuarios (usuario, correo, contrasena, telefono, direccion) values($1, $2, $3, $4, $5) RETURNING *',
    consultarCarritos: 'select mc.imagen, mc.nombre_plato,mc.descripcion , dc.cantidad, dc.precio, dc.total from detalle_carrito dc, menu_comidas mc, carrito c, usuarios u where u.id = c.id_usuario and c.id = dc.id_carrito and dc.id_menu_comida = mc.id and u.id = $1',
    callAgregarCarrito: 'CALL agregar_al_carrito($1, $2, $3)',

    buscarRefreshToken: 'UPDATE usuarios SET refresh_token = $1 WHERE id = $2',

    consultarPedidos: 'select p.id, u.usuario, fecha_pedido, p.estado, p.total from pedidos p, usuarios u where u.id = p.id_usuario order by estado desc ',
    consultarPedido: 'select * from pedidos p where id_usuario = $1 order by estado desc',
    consultarDetallesPedido: 'SELECT * FROM detalle_pedido WHERE id_pedido = $1',
    callCreatePedido: 'CALL confirmar_pedido($1)',

    modificarPedidoEnviado: 'update pedidos set estado = \'Enviado\' where id = $1',
    modificarPedidoCancelado: 'UPDATE pedidos set estado = \'Cancelado\' where id = $1',

    consultarTemporadas: 'select * from temporada',
    consultarTemporada: 'select * from temporada where id = $1',
    insertarTemporada: 'insert into temporada (nombre, tarifa) values($1, $2)',
    modificarTemporada: 'update temporada set nombre = $1, tarifa = $2, estado= $3 where id= $4',
}