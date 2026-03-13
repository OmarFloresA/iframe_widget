{
    'name': 'X2Many Search Bar',
    'version': '19.0.1.0.0',
    'category': 'Tools',
    'summary': 'Añade barra de búsqueda en campos one2many y many2many dentro de formularios',
    'description': """
        Agrega una barra de búsqueda encima de los campos one2many y many2many
        (vistas tree/list) dentro de formularios. Filtra los registros visibles
        en tiempo real desde el frontend, sin consultas al servidor.

        Uso: añadir el atributo show_searchbar="1" en el campo del XML de la vista.
        Opcionalmente, search_fields="campo1,campo2" para limitar la búsqueda a
        columnas específicas.
    """,
    'author': 'Omar Flores A',
    'website': 'www.linkedin.com/in/omar-flores-56607422a',
    'depends': ['web'],
    'data': [],
    'assets': {
        'web.assets_backend': [
            'x2many_search_bar/static/src/scss/x2many_search_bar.scss',
            'x2many_search_bar/static/src/xml/x2many_search_bar.xml',
            'x2many_search_bar/static/src/js/x2many_search_bar.js',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
