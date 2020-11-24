// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { getTextFromFile } from "../../test/helpers";

describe("simpleView", () => {
    it("revealInVSCode calls openInEditor", async () => {
        const apply = await import("./simpleView");
        const expected = {
            columnNumber: 0,
            lineNumber: 0,
            omitFocus: false,
            uiSourceCode: {
                _url: "http://bing.com",
            },
        };
        const mockOpen = jest.fn();
        (global as any).InspectorFrontendHost = {
                openInEditor: mockOpen,
        };

        await apply.revealInVSCode(expected, expected.omitFocus);

        expect(mockOpen).toHaveBeenCalled();
    });

    it("applyCommonRevealerPatch correctly changes text", async () => {
        const filePath = "common/common.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applyCommonRevealerPatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(
            expect.stringContaining("let reveal = function revealInVSCode(revealable, omitFocus) {"));
    });

    it("applyQuickOpenPatch correctly changes handleAction text for Quick Open", async () => {
        const filePath = "quick_open/quick_open.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applyQuickOpenPatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(
            expect.stringContaining("handleAction(context, actionId) { actionId = null; switch(actionId)"));
    });

    it("applyCommandMenuPatch correctly changes attach text for command menu", async () => {
        const filePath = "quick_open/quick_open.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applyCommandMenuPatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(
            expect.stringContaining("Root.Runtime.extensionSettings.get('networkEnabled');"));
    });

    it("applyInspectorViewPatch correctly changes _showDrawer text", async () => {
        const filePath = "ui/ui.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applyInspectorViewShowDrawerPatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(expect.stringContaining("_showDrawer(focus) { return false;"));
    });

    it("applyMainViewPatch correctly changes text", async () => {
        const filePath = "main/main.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applyMainViewPatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(
            expect.stringContaining("const moreTools = { defaultSection: () => ({ appendItem: () => {} }) };"));
    });

    it("applyDrawerTabLocationPatch correctly changes text", async () => {
        const filePath = "ui/ui.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applyDrawerTabLocationPatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(expect.stringContaining(
            "this._showDrawer.bind(this, false), 'drawer-view', true, true, 'network.blocked-urls'"));
    });

    it("applySetTabIconPatch correctly changes text", async () => {
        const filePath = "ui/ui.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applySetTabIconPatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(expect.stringContaining("if(!tab){return;}"));
    });

    it("applyAppendTabPatch correctly changes text", async () => {
        const filePath = "ui/ui.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applyAppendTabPatch(fileContents);
        expect(result).toEqual(expect.stringContaining(
            "appendTabOverride(id, tabTitle, view, tabTooltip, userGesture, isCloseable, index) {"));
    });

    it("applyRemoveBreakOnContextMenuItem correctly changes text", async () => {
        const filePath = "browser_debugger/browser_debugger.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applyRemoveBreakOnContextMenuItem(fileContents);
        expect(result).not.toEqual(null);
        if (result) {
            expect(result).not.toEqual(expect.stringContaining("const breakpointsMenu"));
        }
    });

    it("applyShowRequestBlockingTab correctly changes text", async () => {
        const filePath = "ui/ui.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applyShowRequestBlockingTab(fileContents);
        expect(result).not.toEqual(null);
        if (result) {
            expect(result).toEqual(expect.stringContaining(
                "if(!view.isCloseable()||id==='network.blocked-urls')"));
        }
    });

    it("applyPersistRequestBlockingTab correctly changes text", async () => {
        const filePath = "ui/ui.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applyPersistRequestBlockingTab(fileContents);
        expect(result).not.toEqual(null);
        if (result) {
            expect(result).toEqual(expect.stringContaining(
                "this._closeable=id==='network.blocked-urls'?false:closeable;"));
        }
    });

    it("applyInspectorCommonCssPatch correctly changes text", async () => {
        const filePath = "shell.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applyInspectorCommonCssPatch(fileContents);
        // If this part of the css was correctly applied to the file, the rest of the css will be there as well.
        const expectedString =
            ".toolbar-button[aria-label='Toggle screencast'] {\\n            visibility: visible !important;";

        expect(result).not.toEqual(null);
        if (result) {
            expect(result).toEqual(expect.stringContaining(expectedString));
        }
    });

    it("applyInspectorCommonNetworkPatch correctly changes text", async () => {
        const filePath = "shell.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applyInspectorCommonNetworkPatch(fileContents);
        // If this part of the css was correctly applied to the file, the rest of the css will be there as well.
        const expectedString =
            ".toolbar-button[aria-label='Export HAR...'] {\\n            display: none !important;";

        expect(result).not.toEqual(null);
        if (result) {
            expect(result).toEqual(expect.stringContaining(expectedString));
        }
    });

    it("applyInspectorCommonContextMenuPatch correctly changes text", async () => {
        const filePath = "shell.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const apply = await import("./simpleView");
        const result = apply.applyInspectorCommonContextMenuPatch(fileContents);
        // If this part of the css was correctly applied to the file, the rest of the css will be there as well.
        const expectedString =
            ".soft-context-menu-item[aria-label='Save as...'] {\\n            display: none !important;";

        expect(result).not.toEqual(null);
        if (result) {
            expect(result).toEqual(expect.stringContaining(expectedString));
        }
    });

    it("applyInspectorCommonCssRightToolbarPatch correctly changes tabbed-pane-right-toolbar", async () => {
        const filePath = "shell.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const expectedResult =
            ".tabbed-pane-right-toolbar {\\n            visibility: hidden !important;\\n        }";
        const apply = await import("./simpleView");
        const result = apply.applyInspectorCommonCssRightToolbarPatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(expect.stringContaining(expectedResult));
    });

    it("applyInspectorCommonCssTabSliderPatch correctly changes tabbed-pane-tab-slider", async () => {
        const filePath = "shell.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const expectedResult =
            ".tabbed-pane-tab-slider {\\n            display: none !important;\\n        }";
        const apply = await import("./simpleView");
        const result = apply.applyInspectorCommonCssTabSliderPatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(expect.stringContaining(expectedResult));
    });

    it("applyRemoveNonSupportedRevealContextMenu correctly changes text", async () => {
        const filePath = "components/components.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const expectedResult = "if(destination === \"Elements panel\")";
        const apply = await import("./simpleView");
        const result = apply.applyRemoveNonSupportedRevealContextMenu(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(expect.stringContaining(expectedResult));
    });

    it("applyThemePatch correctly modifies themes to use theme parameter", async () => {
        const filePath = "themes/themes.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }
        const expectedResult = "Root.Runtime.extensionSettings.get('theme');";
        const apply = await import("./simpleView");
        const result = apply.applyThemePatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(expect.stringContaining(expectedResult));
    });

    it("applyDefaultTabPatch correctly modifies text to prevent usage of TabbedLocation._defaultTab", async () => {
        const filePath = "ui/ui.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const expectedResult = "this._defaultTab=undefined;";
        const apply = await import("./simpleView");
        const result = apply.applyDefaultTabPatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(expect.stringContaining(expectedResult));
    });

    it("applyRemovePreferencePatch correctly modifes host.js to ignore localStorage deletion", async () => {
        const filePath = "host/host.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const expectedResult = "removePreference(name){return;}";
        const apply = await import("./simpleView");
        const result = apply.applyRemovePreferencePatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(expect.stringContaining(expectedResult));
    });

    it("applyCreateExtensionSettingsPatch correctly changes root.js to include extensionSettings global const", async () => {
        const filePath = "root/root.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const expectedResult = "extensionSettings:extensionSettings";
        const apply = await import("./simpleView");
        const result = apply.applyCreateExtensionSettingsPatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(expect.stringContaining(expectedResult));
    });

    it("applyCreateExtensionSettingsLegacyPatch correctly changes root-legacy.js to include extensionSettings glbal const", async () => {
        const filePath = "root/root-legacy.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const expectedResult = "Root.Runtime.extensionSettings";
        const apply = await import("./simpleView");
        const result = apply.applyCreateExtensionSettingsLegacyPatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(expect.stringContaining(expectedResult));
    });

    it("applyPortSettingsPatch correctly changes root.js to set extensionSettings map", async () => {
        const filePath = "root/root.js";
        const fileContents = getTextFromFile(filePath);
        if (!fileContents) {
            throw new Error(`Could not find file: ${filePath}`);
        }

        const expectedResult = "this.getNetworkSetting";
        const expectedResult2 = "this.getThemesSetting";
        const apply = await import("./simpleView");
        const result = apply.applyPortSettingsPatch(fileContents);
        expect(result).not.toEqual(null);
        expect(result).toEqual(expect.stringContaining(expectedResult));
        expect(result).toEqual(expect.stringContaining(expectedResult2));
    });
});
