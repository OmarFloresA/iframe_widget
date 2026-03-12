{
    'name': 'Month Picker Widget',
    'version': '19.0.1.0.0',
    'category': 'Tools',
    'summary': 'Widget para seleccionar meses del año en campos char',
    'description': """
        Añade el widget 'month_picker' para campos de tipo Char.
        Muestra un selector visual de meses (Enero–Diciembre) y
        guarda únicamente el número del mes como string (ej. "3" para Marzo).
    """,
    'author': 'Omar Flores A',
    'website': 'www.linkedin.com/in/omar-flores-56607422a',
    'depends': ['web'],
    'data': [],
    'assets': {
        'web.assets_backend': [
            'month_picker_widget/static/src/scss/month_picker_widget.scss',
            'month_picker_widget/static/src/js/month_picker_widget.js',
            'month_picker_widget/static/src/xml/month_picker_widget.xml',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
