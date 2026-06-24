import { patch } from '@web/core/utils/patch';
import { browser } from '@web/core/browser/browser';

import { Chatter } from '@mail/chatter/web_portal/chatter';
import { RecipientsList } from '@web_chatter_position/core/recipients_list/recipients_list';

patch(Chatter.prototype, {
    setup() {
        super.setup(...arguments);
        const showNotificationMessages = browser.localStorage.getItem(
            'web_chatter_position.notifications'
        );
        this.state.showNotificationMessages = (
            showNotificationMessages != null ? 
            JSON.parse(showNotificationMessages) : true
        );
        this.state.notifyInternalFollowers = false;
    },
    onClickNotificationsToggle() {
        const showNotificationMessages = !this.state.showNotificationMessages;
        browser.localStorage.setItem(
            'web_chatter_position.notifications', showNotificationMessages
        );
        this.state.showNotificationMessages = showNotificationMessages;
    },
});

Object.assign(Chatter.components, {
    RecipientsList,
});
