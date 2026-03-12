{
    'name': 'Company Color Topbar',
    'version': '19.0.1.0.0',
    'category': 'Tools',
    'summary': 'Colorea la barra superior según la compañía activa',
    'description': """
        Este módulo añade un campo de color (entero) al modelo res.company.
        El color seleccionado se aplica dinámicamente a la barra de navegación
        superior del sistema, permitiendo identificar visualmente en qué
        compañía se está trabajando.
    """,
    'author': 'Omar Flores A',
    'website': 'www.linkedin.com/in/omar-flores-56607422a',
    'depends': ['base', 'web'],
    'data': [
        'views/res_company_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'company_color_topbar/static/src/js/company_color.js',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
