/** @odoo-module **/

import { NavBar } from "@web/webclient/navbar/navbar";
import { patch } from "@web/core/utils/patch";
import { user, userBus } from "@web/core/user";
import { session } from "@web/session";
import { onMounted, onWillUnmount } from "@odoo/owl";

/**
 * Paleta de colores estándar de Odoo (índices 0-11).
 * Corresponde a los colores usados en las tarjetas de kanban.
 */
const COLOR_MAP = {
    0: null,         // Sin color (usa el color por defecto)
    1: "#FF9B9B",    // Rojo
    2: "#F4A460",    // Arena/Naranja suave
    3: "#FFE88B",    // Amarillo
    4: "#ADFFFE",    // Azul claro
    5: "#F17FDC",    // Púrpura
    6: "#FFBAA1",    // Gris
    7: "#67DEFA",    // Verde
    8: "#7396EB",    // Violeta
    9: "#FF71A7",    // Azul
    10: "#7AFFC3",   // Verde azulado
    11: "#CC90FE",   // Rojo oscuro
};

/**
 * Calcula si el texto sobre un color de fondo debe ser claro u oscuro
 * usando la fórmula de luminancia relativa (WCAG).
 */
function isDarkColor(hexColor) {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
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
        const textColor = isDarkColor(hexColor) ? "#FFFFFF" : "#212529";
        navbar.style.backgroundColor = hexColor;
        navbar.style.color = textColor;
        navbar.style.setProperty("--navbar-text-color", textColor);
    } else {
        navbar.style.backgroundColor = "";
        navbar.style.color = "";
        navbar.style.removeProperty("--navbar-text-color");
    }
}

patch(NavBar.prototype, {
    setup() {
        super.setup();

        const applyColor = () => {
            const companyId = user.activeCompany?.id;
            const colorIndex = session.company_topbar_colors?.[companyId] ?? 0;
            applyNavbarColor(COLOR_MAP[colorIndex] || null);
        };

        onMounted(applyColor);
        userBus.addEventListener("ACTIVE_COMPANIES_CHANGED", applyColor);
        onWillUnmount(() => {
            userBus.removeEventListener("ACTIVE_COMPANIES_CHANGED", applyColor);
        });
    },
});
