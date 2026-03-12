/** @odoo-module **/

import { NavBar } from "@web/webclient/navbar/navbar";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
import { onMounted, onPatched } from "@odoo/owl";

/**
 * Paleta de colores estándar de Odoo (índices 0-11).
 * Corresponde a los colores usados en las tarjetas de kanban.
 */
const COLOR_MAP = {
    0: null,         // Sin color (usa el color por defecto)
    1: "#F06050",    // Rojo
    2: "#F4A460",    // Arena/Naranja suave
    3: "#F7CD1F",    // Amarillo
    4: "#6CC1ED",    // Azul claro
    5: "#814968",    // Púrpura
    6: "#AFAFAF",    // Gris
    7: "#30C381",    // Verde
    8: "#9365B8",    // Violeta
    9: "#3D73B9",    // Azul
    10: "#0E7C7B",   // Verde azulado
    11: "#DD5B5B",   // Rojo oscuro
};

/**
 * Calcula si el texto sobre un color de fondo debe ser claro u oscuro
 * usando la fórmula de luminancia relativa (WCAG).
 * Devuelve true si el fondo es oscuro (texto debe ser blanco).
 */
function isDarkColor(hexColor) {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
}

/**
 * Aplica el color de la compañía a la barra de navegación superior.
 */
function applyNavbarColor(hexColor) {
    const navbar = document.querySelector(".o_main_navbar");
    if (!navbar) {
        return;
    }
    if (hexColor) {
        navbar.style.backgroundColor = hexColor;
        navbar.style.color = isDarkColor(hexColor) ? "#FFFFFF" : "#212529";
        // Propagamos el color de texto a los iconos y links de la navbar
        navbar.style.setProperty("--navbar-text-color", isDarkColor(hexColor) ? "#FFFFFF" : "#212529");
    } else {
        navbar.style.backgroundColor = "";
        navbar.style.color = "";
        navbar.style.removeProperty("--navbar-text-color");
    }
}

patch(NavBar.prototype, {
    setup() {
        super.setup();
        this.companyService = useService("company");
        this.orm = useService("orm");

        const fetchAndApplyColor = async () => {
            try {
                const companyId = this.companyService.currentCompany.id;
                const [company] = await this.orm.read(
                    "res.company",
                    [companyId],
                    ["color"]
                );
                const hexColor = COLOR_MAP[company.color] || null;
                applyNavbarColor(hexColor);
            } catch {
                // En caso de error no modificamos el color de la navbar
            }
        };

        onMounted(fetchAndApplyColor);
        onPatched(fetchAndApplyColor);
    },
});
