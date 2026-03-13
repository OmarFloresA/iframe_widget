/** @odoo-module **/

import { X2ManyField, x2ManyField } from "@web/views/fields/x2many/x2many_field";
import { patch } from "@web/core/utils/patch";
import { useState, onPatched, useRef } from "@odoo/owl";

// ---------------------------------------------------------------------------
// Extend props to accept the two new attributes declared in the view XML
// ---------------------------------------------------------------------------
X2ManyField.props = {
    ...X2ManyField.props,
    showSearchBar: { type: Boolean, optional: true },
    searchFields: { type: String, optional: true },
};

// ---------------------------------------------------------------------------
// Patch X2ManyField to inject search-bar behaviour
// ---------------------------------------------------------------------------
patch(X2ManyField.prototype, {
    setup() {
        super.setup(...arguments);

        // useRef must be called unconditionally (OWL hook rules).
        // The template extension adds t-ref="x2manySearchContainer" to the
        // root div for every X2ManyField instance; it is only consumed here
        // when showSearchBar is true.
        this.searchContainerRef = useRef("x2manySearchContainer");

        if (this.props.showSearchBar) {
            this.searchState = useState({ query: "" });

            // Re-apply the DOM filter every time OWL re-renders the component
            // (e.g. after a record is added / removed / paged).
            onPatched(() => {
                this._applySearchFilter();
            });
        }
    },

    /**
     * Hide/show <tr> rows based on the current search query.
     * Filtering is done entirely in the browser – no server round-trips.
     */
    _applySearchFilter() {
        if (!this.props.showSearchBar || !this.searchContainerRef.el) {
            return;
        }

        const query = (this.searchState.query || "").toLowerCase().trim();
        const rows = this.searchContainerRef.el.querySelectorAll(
            "tbody tr.o_data_row"
        );
        const searchFields = this.props.searchFields;

        rows.forEach((row) => {
            // Empty query → show everything
            if (!query) {
                row.style.display = "";
                return;
            }

            let text = "";

            if (!searchFields || searchFields === "*columns") {
                // Search across all visible text in the row
                text = row.textContent;
            } else {
                // Search only within the specified field columns.
                // Each <td> rendered by ListRenderer carries a `name` attribute
                // equal to the field name (t-att-name="column.name").
                const fieldNames = searchFields.split(",").map((f) => f.trim());
                fieldNames.forEach((fieldName) => {
                    const cell = row.querySelector(`td[name="${fieldName}"]`);
                    if (cell) {
                        text += " " + cell.textContent;
                    }
                });
            }

            // Case-insensitive partial match
            row.style.display = text.toLowerCase().includes(query) ? "" : "none";
        });
    },

    /** Called by the search <input> on every keystroke. */
    onSearchInput(ev) {
        if (this.props.showSearchBar) {
            this.searchState.query = ev.target.value;
            this._applySearchFilter();
        }
    },

    /** Called by the × clear button. */
    onClearSearch() {
        if (this.props.showSearchBar) {
            this.searchState.query = "";
            this._applySearchFilter();
        }
    },
});

// ---------------------------------------------------------------------------
// Patch extractProps so the view XML attributes reach the component as props
// ---------------------------------------------------------------------------
const _originalExtractProps = x2ManyField.extractProps;

x2ManyField.extractProps = (fieldInfo, dynamicInfo) => {
    const props = _originalExtractProps(fieldInfo, dynamicInfo);
    const { attrs } = fieldInfo;

    if (attrs.show_searchbar === "1" || attrs.show_searchbar === "true") {
        props.showSearchBar = true;
    }
    if (attrs.search_fields) {
        props.searchFields = attrs.search_fields;
    }

    return props;
};
