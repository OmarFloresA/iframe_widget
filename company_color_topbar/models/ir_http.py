from odoo import models


class IrHttp(models.AbstractModel):
    _inherit = 'ir.http'

    def session_info(self):
        result = super().session_info()
        user_companies = result.get('user_companies', {})
        allowed = user_companies.get('allowed_companies', {})
        if allowed:
            company_ids = list(allowed.keys())
            companies = self.env['res.company'].browse(company_ids).sudo()
            result['company_topbar_colors'] = {c.id: c.topbar_color for c in companies}
        return result
