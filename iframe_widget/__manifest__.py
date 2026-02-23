{
    'name': 'Widget IFrame URL',
    'version': '19.0.1.0.0',
    'category': 'Tools',
    'summary': 'Widget personalizado para mostrar URLs en iframe',
    'description': """
        Este módulo añade un widget personalizado que permite mostrar
        campos de tipo texto como iframes en las vistas de formulario.
    """,
    'author': 'Omar Flores A',
    'website': 'www.linkedin.com/in/omar-flores-56607422a',
    'depends': ['web'],
    'data': [],
    'assets': {
        'web.assets_backend': [
            'iframe_widget/static/src/js/iframe_url_widget.js',
            'iframe_widget/static/src/xml/iframe_url_widget.xml',
        ],
    },
    'images': ['static/description/banner.jpg'],
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
