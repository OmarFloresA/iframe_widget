/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState, useRef, useEffect } from "@odoo/owl";
import { standardFieldProps } from "@web/views/fields/standard_field_props";

const MONTHS = [
    { number: 1,  name: "Enero" },
    { number: 2,  name: "Febrero" },
    { number: 3,  name: "Marzo" },
    { number: 4,  name: "Abril" },
    { number: 5,  name: "Mayo" },
    { number: 6,  name: "Junio" },
    { number: 7,  name: "Julio" },
    { number: 8,  name: "Agosto" },
    { number: 9,  name: "Septiembre" },
    { number: 10, name: "Octubre" },
    { number: 11, name: "Noviembre" },
    { number: 12, name: "Diciembre" },
];

export class MonthPickerWidget extends Component {
    static template = "month_picker_widget.MonthPickerWidget";
    static props = {
        ...standardFieldProps,
    };

    setup() {
        this.months = MONTHS;
        this.state = useState({ isOpen: false });
        this.containerRef = useRef("container");

        // Cierra el dropdown al hacer click fuera del componente
        useEffect(
            () => {
                if (!this.state.isOpen) {
                    return;
                }
                const handleClickOutside = (ev) => {
                    if (
                        this.containerRef.el &&
                        !this.containerRef.el.contains(ev.target)
                    ) {
                        this.state.isOpen = false;
                    }
                };
                document.addEventListener("click", handleClickOutside);
                return () => document.removeEventListener("click", handleClickOutside);
            },
            () => [this.state.isOpen]
        );
    }

    /** Devuelve el objeto mes correspondiente al valor actual del campo, o null. */
    get selectedMonth() {
        const value = this.props.record.data[this.props.name];
        if (!value && value !== 0) {
            return null;
        }
        return MONTHS.find((m) => String(m.number) === String(value)) || null;
    }

    /** Nombre del mes seleccionado para mostrar en la UI. */
    get displayValue() {
        return this.selectedMonth ? this.selectedMonth.name : "";
    }

    toggleDropdown() {
        this.state.isOpen = !this.state.isOpen;
    }

    /**
     * Guarda el número del mes como string en el campo char
     * y cierra el dropdown.
     */
    selectMonth(month) {
        this.props.record.update({ [this.props.name]: String(month.number) });
        this.state.isOpen = false;
    }

    /** Limpia la selección sin propagar el evento al toggle. */
    clearSelection(ev) {
        ev.stopPropagation();
        this.props.record.update({ [this.props.name]: false });
        this.state.isOpen = false;
    }

    isSelected(month) {
        const value = this.props.record.data[this.props.name];
        return String(month.number) === String(value);
    }
}

registry.category("fields").add("month_picker", {
    component: MonthPickerWidget,
    supportedTypes: ["char"],
});
