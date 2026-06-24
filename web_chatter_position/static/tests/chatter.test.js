import { expect, test } from "@odoo/hoot";

import { browser } from "@web/core/browser/browser";
import { Chatter } from "@mail/chatter/web_portal/chatter";

import "@web_chatter_position/chatter/chatter";

test.tags("web_chatter_position");
test("notifications toggle updates localStorage and state", async () => {
    browser.localStorage.removeItem("web_chatter_position.notifications");
    browser.localStorage.setItem(
        "web_chatter_position.notifications", JSON.stringify(false)
    );
    const chatter = {
        state: {
            showNotificationMessages: false,
        },
    };
    Chatter.prototype.onClickNotificationsToggle.call(chatter);
    expect(chatter.state.showNotificationMessages).toBe(true);
    expect(
        JSON.parse(browser.localStorage.getItem(
            "web_chatter_position.notifications"
        ))
    ).toBe(true);
    Chatter.prototype.onClickNotificationsToggle.call(chatter);
    expect(chatter.state.showNotificationMessages).toBe(false);
    expect(
        JSON.parse(browser.localStorage.getItem(
            "web_chatter_position.notifications"
        ))
    ).toBe(false);
});
