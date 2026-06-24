import { Component } from '@odoo/owl';

export class RecipientsListPopover extends Component {
    static template = 'web_chatter_position.RecipientsListPopover';
    static props = {
        recipients: { type: Array },
        close: { type: Function, required: true },
    };
}
