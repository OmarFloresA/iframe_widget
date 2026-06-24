from odoo import fields, models


class ResCompany(models.Model):
    _inherit = 'res.company'

    topbar_color = fields.Integer(
        string='Color de barra superior',
        default=0,
        help='Selecciona un color (0-11) para identificar visualmente esta compañía '
             'en la barra de navegación superior del sistema.',
    )
