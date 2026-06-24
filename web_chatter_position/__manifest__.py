{
    'name': 'MuK Chatter', 
    'summary': 'Adds options for the chatter',
    'description': '''
        This module improves the design of the chatter and adds a user
        preference to set the position of the chatter in the form view.
    ''',
    'version': '19.0.1.4.4',
    'category': 'Tools/UI',
    'license': 'LGPL-3',
    'author': 'Omar Flores A',
    'website': 'www.linkedin.com/in/omar-flores-56607422a',
    'depends': [
        'mail',
    ],
    'data': [
        'views/res_users.xml',
    ],
    'assets': {
        'web._assets_primary_variables': [
            (
                'after', 
                'web/static/src/scss/primary_variables.scss', 
                'web_chatter_position/static/src/scss/variables.scss'
            ),
        ],
        'web.assets_backend': [
            'web_chatter_position/static/src/core/**/*.*',
            'web_chatter_position/static/src/chatter/*.scss',
            'web_chatter_position/static/src/chatter/*.xml',
            (
                'after', 
                'mail/static/src/chatter/web_portal/chatter.js', 
                'web_chatter_position/static/src/chatter/chatter.js'
            ),
            (
                'after',
                'mail/static/src/core/common/composer.js',
                'web_chatter_position/static/src/chatter/composer.js'
            ),
            (
                'after',
                'mail/static/src/core/common/store_service.js',
                'web_chatter_position/static/src/chatter/store_service.js'
            ),
            (
                'after', 
                'mail/static/src/chatter/web/form_compiler.js', 
                'web_chatter_position/static/src/views/form/form_compiler.js'
            ),
            'web_chatter_position/static/src/views/form/form_renderer.js',
        ],
        'web.assets_unit_tests': [
            'web_chatter_position/static/tests/**/*.test.js',
        ],
    },
    'images': [
        'static/description/banner.png',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
}
